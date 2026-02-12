require("dotenv").config()

const app =require("./src/app")
// const mongoose=require("mongoose")
const connectDB=require('./src/config/database')

connectDB()
app.listen(3000,()=>{
    console.log("server is running on port 3000")
})