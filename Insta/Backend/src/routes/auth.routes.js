const express=require("express")
const authController= require("../controllers/auth.controllers")
const identifyUser=require("../middleware/auth.middleware")
const authRouter =express.Router()



/******
 *  Post /api/auth/register
 */

authRouter.post('/register',authController.registerController)

authRouter.post("/login",authController.loginController)

authRouter.get("/get-me",identifyUser,authController.getMeController)

module.exports=authRouter
