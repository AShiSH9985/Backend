const express = require("express")
const postRouter=express.Router()
const PostController =require("../controllers/post.controllers")
const multer=require("multer")
const storage = multer.memoryStorage()
const upload = multer({storage:storage})

 /*****
  * Post /api/posts [protected]
  * req.body = {captain,image-file}
  */

 postRouter.post("/",upload.single("image"),PostController.createPostControllers)

 module.exports=postRouter