  
const { Router } = require("express");
const { post_signup, post_login, get_logout } = require("../controllers/authController");

const  authRouter = Router()

authRouter.post('/signup',post_signup)
authRouter.post("/login",post_login)
authRouter.get('/logout',get_logout)

module.exports = authRouter