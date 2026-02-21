const express = require("express")
const postRouter=express.Router()
const PostController =require("../controllers/post.controllers")
const multer=require("multer")
const storage = multer.memoryStorage()
const upload = multer({storage:storage})
const identifyUser=require("../middleware/auth.middleware")
 /*****
  * @route Post /api/posts [protected]
  * req.body = {captain,image-file}
  */

 postRouter.post("/",upload.single("image"),identifyUser,PostController.createPostControllers)

 /***
  * @route get /api/posts/
  */

 postRouter.get("/",identifyUser,PostController.getPostController)

 /***
  * @route get /api/posts/details/:postid
  * - return detail about specific post with the id . also check whether the post belongs to the user that is request come from
  */

 postRouter.get("/details/:postId",identifyUser,PostController.getPostDetailsController)

 /**
  * @route Post /api/posts/like/:postId
  * @description like a post with the id provided in the request params
  */
 postRouter.post("/like/:postId",identifyUser,PostController.likePostController)

 module.exports=postRouter