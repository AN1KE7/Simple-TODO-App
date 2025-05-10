const express = require("express");
const { CreateTask, TaskId } = require("./types");
const { Todos } = require("./database/mongodb");
const cors = require("cors")
const app = express();
const PORT = 3000;

app.use(express.json());
app.use(cors());

app.get("/todo" ,async function (req,res,next){
    try{
        const todos = await Todos.find();
        res.status(200).json({
            todos:todos
        })
    }
    catch(error){
        console.log(error);
        res.status(500).json({
            msg:"Request Failed"
        })
    }
});

app.post("/todo" ,async function (req,res){
    const newTask = {
        title : req.body.title,
        description : req.body.description,
        completed: false
    }

    
    const parsedInput = CreateTask.safeParse(newTask);

    if(parsedInput.success!=true){
        res.status(411).json({
           msg : "Wrong inputs sent."
        })
    }
       
    try{
        await Todos.create(newTask);
        res.status(201).json({ msg:"Task created"});
    }
    catch(error){
        console.log(error);
        res.status(500).json({
            msg:"Request Failed"
        })
    };
    
});

app.put("/completed" ,async function (req,res){
   
    const parsedInput = TaskId.safeParse(req.body);

    if(parsedInput.success!=true){
        res.status(401).json({
           msg : "Wrong inputs sent."
        })
    }
       
    try{
        await Todos.findByIdAndUpdate({_id : req.body.id} , {completed : true});
        res.status(200).json({
            msg:"Task marked as done."
        })
    }
    catch(error){
        console.log(error);
        res.status(500).json({
            msg:"Request Failed"
        })    
    };
});

app.listen(PORT , ()=>{
    console.log(`Server running on PORT ${PORT}.`)
});