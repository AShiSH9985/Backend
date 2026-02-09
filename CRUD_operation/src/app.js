// server ko create karna

const express=require("express")
const app=express()
const notemodel=require("./models/notes.model")

app.use(express.json())

app.post("/notes",async (req,res)=>{
    const {title,description}=req.body
    const note = await notemodel.create({
        title,description
    })
    res.status(201).json({
        message:"Note created successfully",
        note
    })
})

// Get/notes
// fetch all the notes data
app.get("/notes", async (req,res)=>{
    const notes= await notemodel.find()
    res.status(200).json({
        message:"notes fetched successfully",
        notes
    })
})

//


module.exports=app