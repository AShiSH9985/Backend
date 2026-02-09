
// server se connect karna
// database se connect  karna

require("dotenv").config();
const connectToDb = require("./src/config/database");
const app=require("./src/app")

connectToDb()



app.listen(3000,()=>{
    console.log("started on 3000 port")
})