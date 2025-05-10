const zod = require("zod");

const CreateTask =  zod.object({
    title : zod.string(),
    description : zod.string()
})

const TaskId = zod.object({
    id : zod.string()
})


module.exports = {
    CreateTask : CreateTask,
    TaskId : TaskId 
}