const express = require("express");
const { CreateTask, TaskId } = require("./types");
const { Task } = require("./database/mongodb");
const app = express();
const PORT = 3000;

app.use(express.json());

app.get("/todo" ,async function (req,res,next){
    try{
        const tasks = await Task.find();
        res.status(200).json({
            success:true,
            tasks: tasks
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
        await Task.create(newTask);
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
   
    const doneTaskId = req.body.id;

    
    const parsedInput = TaskId.safeParse(doneTaskId);

    if(parsedInput.success!=true){
        res.status(411).json({
           msg : "Wrong inputs sent."
        })
    }
       
    try{
        await Task.findByIdAndUpdate({_id : req.body.id} , {completed : true});
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