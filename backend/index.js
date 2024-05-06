const express= require('express')
const { createTodo, updateTodo }= require("./types")
const { todo }= require("./db")
const cors= require("cors")
const app= express()
const port= 3000

app.use(express.json())
app.use(cors())
 
app.post("/todo", async (req, res) => {
    try{
        console.log(req.body)
        const parsedPayload= createTodo.safeParse(req.body)
        if(!parsedPayload.success){
            res.status(411).json({ msg: "You sent the wrong inputs!" })
            return
        }
        await todo.create({
            title: parsedPayload.data.title,
            description: parsedPayload.data.description,
            completed: false
        })
         
        res.status(200).json({msg: "Successfully created!"})
    }catch(err){
        console.log("error: ", err)
    }
})

app.get("/todos", async (req,res) => {
    const todos= await todo.find()

    res.status(200).json(todos)
})

app.put("/completed", async (req, res) => {
    const parsedPayload= updateTodo.safeParse(req.body)
    if(!parsedPayload.success){
        res.status(411).json({msg: "You sent the wrong inputs!"})
        return 
    }
    const currTodo= await todo.updateOne({
        _id: req.body.id
    },{
        completed: true
    })

    if(updateTodo){
        res.status(200).json({msg: "Successfully Updated!"})
    }else{
        res.status(401).json({msg: "Failed to update!"})
    }
})

app.listen(port, () => {
    console.log(`Server listing on port ${port}`)
})