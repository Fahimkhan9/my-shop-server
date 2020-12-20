const jwt = require("jsonwebtoken")
const User = require("../models/user")


// handle errors
const handleErrors = (err) => {
    console.log(err.message, err.code);
    let errors = { email: "", password: "" };
  
    ///incorrect email
    if (err.message === "incorrect email") {
      errors.email = "That email is not registered";
    }
  
    // incorrect password
    if (err.message === "incorrect password") {
      errors.password = "That password is incorrect";
    }
  
    // duplicate email error
    if (err.code === 11000) {
      errors.email = "that email is already registered";
      return errors;
    }
  
    // validation errors
    if (err.message.includes("user validation failed")) {
      Object.values(err.errors).forEach(({ properties }) => {
        errors[properties.path] = properties.message;
      });
    }
  
    return errors;
  };

const maxAge = 3 * 24 * 60 * 60;
const createToken =(id) => {
return jwt.sign({id},`${process.env.JWT_SECRET}`,{
    expiresIn:maxAge
})
}

module.exports.post_signup =async (req,res) => {
const {name,email,password} = req.body 
try {
    const user = await User.create({name,email,password})
    const token = createToken(user._id)
    res.cookie('jwt',token,{httpOnly:true,maxAge:maxAge * 100,secure:true })

res.status(201).json({ user: user._id });
} catch (err) {
    const errors = handleErrors(err);
    res.status(400).json({ errors });
}
}
module.exports.post_login =async(req,res) => {
    const { email, password } = req.body;

    try {
      const user = await User.login(email, password);
      const token = createToken(user._id);
      res.cookie("jwt", token, { httpOnly: true, maxAge: maxAge * 1000,secure:true });
  
      res.status(200).json({ user: user._id });
    } catch (err) {
      const errors = handleErrors(err);
      res.status(400).json({ errors });
    }
}
module.exports.get_logout =(req,res) => {
    res.cookie("jwt", "", { maxAge: 1 });
  res.redirect("/");
}