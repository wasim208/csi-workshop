const mongoose = require("mongoose");

const todoItemSchema = new mongoose.Schema({
  task: String,
  completed: Boolean,
});

const Todoitem = mongoose.model("Todoitem", todoItemSchema);
//todoitems

module.exports = Todoitem;
