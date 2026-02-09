
const mongoose = require("mongoose")

function connectTODb(){
    mongoose.connect(process.env.Mongo_URI).then(()=>{
        console.log("database connected")
    })
}
module.exports=connectTODb