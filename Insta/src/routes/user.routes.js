const express =require("express")
const userController= require("../controllers/user.controller")
const identifyUser= require("../middleware/auth.middleware")

const userRouter=express.Router()

/**
 * @routes Post /api/users/follow/:userid
 * @description Follow a user
 * @access Private
 */

userRouter.post("/follow/:username",identifyUser,userController.followUserController)
userRouter.post("/unfollow/:username",identifyUser,userController.unfollowUserController)



module.exports = userRouter