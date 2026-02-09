// server ko start karna and database se connect karna

require("dotenv").config()
const mongoose=require("mongoose")
const connectToDb=require("./src/config/database")
const app=require("./src/app")

connectToDb()

app.listen(3000,()=>{
    console.log("server is runnning on port 3000")
})