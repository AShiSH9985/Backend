const express = require("express")
const postRouter=express.Router()
const PostController =require("../controllers/post.controllers")
const multer=require("multer")
const storage = multer.memoryStorage()
const upload = multer({storage:storage})
const identifyUser=require("../middleware/auth.middleware")
 /*****
  * Post /api/posts [protected]
  * req.body = {captain,image-file}
  */

 postRouter.post("/",upload.single("image"),identifyUser,PostController.createPostControllers)

 /***
  * get /api/posts/
  */

 postRouter.get("/",identifyUser,PostController.getPostController)

 /***
  * get /api/posts/details/:postid
  * - return detail about specific post with the id . also check whether the post belongs to the user that is request come from
  */

 postRouter.get("/details/:postId",identifyUser,PostController.getPostDetailsController)

 module.exports=postRouter