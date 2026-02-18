const postModel=require("../models/post.model")
const ImageKit = require("@imagekit/nodejs")
const {toFile}=require("@imagekit/nodejs")
const jwt = require("jsonwebtoken")

const imagekit= new ImageKit({
    privateKey: process.env.IMAGEKIT_PRIVATE_KEY
})

async function createPostControllers(req,res) {
    console.log(req.body,req.file)

    const token=req.cookies.JWT_token
  

    if(!token){
        return res.status(401).json({
            message:"Token not Provided, Unauthorized access "
        })
    }
    let decoded = null
    try{
         decoded = jwt.verify(token,process.env.JWT_SECRET)
    }catch(err){
        return res.status(401).json({
            message:"User not authorized"
        })
    }

    console.log(decoded)
    const file=await imagekit.files.upload({
        file:await toFile(Buffer.from(req.file.buffer),'file'),
        fileName:"test",
        folder:"cohort-2-insta-clone-posts"
    })

    const post= await postModel.create({
        caption:req.body.caption,
        imgUrl:file.url,
        user:decoded.id
    })
    res.status(201).json({
        message:"Post created successfully",
        post
    })
}

module.exports={
    createPostControllers
}