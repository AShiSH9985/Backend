const express=require("express")
const authRouter=express.Router()
const userModel=require("../models/user.model")
const jwt=require("jsonwebtoken")
const crypto =require("crypto")

authRouter.post("/register",async(req,res)=>{
    const {name,email,password}=req.body

    const isUserAlreadyExist= await userModel.findOne({email})
    if(isUserAlreadyExist){
        return res.status(409).json({
            message:"User already register with this email"
        })
    }

    const hashPassword = crypto.createHash("md5").update(password).digest("hex")

    const user=await userModel.create({
        name,email,password:hashPassword
    })

    const token=jwt.sign({
        id:user._id,
        email:user.email
    },process.env.JWT_SECRET)

    res.cookie("jwt_token",token)

    res.status(201).json({
        message:"user registers",
        user,
        token
    })

})




authRouter.post("/login",async (req,res)=>{
    const {email,password} =req.body
    const user =await userModel.findOne({email})

    if(!user){
        return res.status(404).json({
            message:"User not found with this email address"
        })
    }

    
    const isPasswordMatch = user.password === crypto.createHash("md5").update(password).digest("hex")
    if(!isPasswordMatch){
        return res.status(401).json({
            message:"Invalid password"
        })
    }

    const token=jwt.sign({
        id:user._id
    },process.env.JWT_SECRET)

    res.cookie("jwt_token",token)
    res.status(200).json({
        message:"User logged in Successfully",
        user
    })
})

module.exports=authRouter