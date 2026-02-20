const mongoose =require("mongoose")

const likeSchema = new mongoose.Schema({
    post:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"posts",
        requried:[true,"post id is required for creating a like"]
    },
    user:{
        type:String,
        requried:[true,"username is required forr creating a like"]
    }
},  {
    timestamps:true
})
likeSchema.index({post:1, user:1},{unique:true})

const likeModel = mongoose.model("likes",likeSchema)
module.exports = likeModel