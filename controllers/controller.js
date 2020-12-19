const uuid = require("uuid")
const stripe = require('stripe')(`${process.env.KEY}`)
const Product = require("../models/products");

module.exports.home_get = (req, res) => {
  res.send("up and running");
};
module.exports.get_product_by_category = (req, res) => {
  const { category } = req.params;
  Product.find({ category: category })
    .then((result) => res.send(result))
    .catch((err) => console.log(err));
};

module.exports.handle_payment =(req,res) => {
  const {product,token} = req.body 
  console.log(product);
  console.log(product.price);
  const idempotencykey = uuid()
return stripe.customers.create({
  email:token.email,
  source:token.id
})
.then(customer => {
  stripe.charges.create({
    amount:product.price * 100,
    currency: 'usd',
    customer:customer.id,
    receipt_email:token.email,
    description: `purchase of ${product.name} `,
    shipping: {
      name:token.card.name,
      address: {
        country: token.card.address_country
      }
    }
  },{idempotencykey})
})
.then(result => res.status(200).json(result) )
.catch(err => console.log(err))
  // console.log(token);
}
