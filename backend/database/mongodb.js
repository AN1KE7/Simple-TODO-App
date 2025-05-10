const mongoose = require("mongoose");
const { DB_URL } = require("../config");


// Connect to MongoDb
mongoose.connect(DB_URL);

// Schema Design

const TodoSchema = new mongoose.Schema({
    title:String,
    description:String,
    completed:Boolean
});

const Task = mongoose.model("Task" , TodoSchema);

module.exports = { Task }