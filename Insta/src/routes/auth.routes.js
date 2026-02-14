const express=require("express")
const authRouter =express.Router()
const authController= require("../controllers/auth.controllers")



/******
 *  Post /api/auth/register
 */

authRouter.post('/register',authController.registerController)

authRouter.post("/login",authController.loggedIn)
module.exports=authRouter
