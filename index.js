const express = require("express");
const path = require("path");
const todoList = require("./todo");
const { v4 } = require("uuid");
require("./database");

const Todoitem = require("./models/todoItemSchema");

const app = express();

const PORT = 4000;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "home.html"));
});

app.get("/api/todo", (req, res) => {
  Todoitem.find({}, (err, docs) => {
    if (err) throw err;
    res.json(docs);
  });
});

app.post("/api/todo", (req, res) => {
  const newTodoItem = new Todoitem({ task: req.body.task, completed: false });
  newTodoItem.save();
  res.send({ message: "item added" });
});

app.put("/api/todo/:id", (req, res) => {
  const id = req.params.id;
  Todoitem.findByIdAndUpdate(id, { $set: { completed: true } }, (err, data) => {
    if (err) res.status(500).send(err);
    else res.send({ message: "updated" });
  });
});

app.delete("/api/todo/:id", (req, res) => {
  const id = req.params.id;
  Todoitem.findByIdAndRemove(id, (err, data) => {
    if (err) res.status(500).send(err);
    else res.send({ message: "item deleted" });
  });
});

app.listen(PORT, () => console.log(`server running on ${PORT}`));
