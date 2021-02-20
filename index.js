const express = require("express");
const path = require("path");
const todoList = require("./todo");
const { v4 } = require("uuid");

const app = express();

const PORT = 4000;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "home.html"));
});

app.get("/api/todo", (req, res) => {
  res.json(todoList);
});

app.post("/api/todo", (req, res) => {
  const newTask = {
    id: v4(),
    task: req.body.task,
    completed: false,
  };
  todoList.push(newTask);
  res.json(todoList);
});

app.put("/api/todo/:id", (req, res) => {
  const id = req.params.id;
  if (todoList.some((todo) => todo.id === id)) {
    todoList.forEach((todo) => {
      if (todo.id === id) {
        todo.completed = true;
      }
    });
    res.json(todoList);
  } else {
    res.status(400).json({ msg: `item with id ${id} not found` });
  }
});

app.delete("/api/todo/:id", (req, res) => {
  const id = req.params.id;
  if (todoList.some((todo) => todo.id === id)) {
    todoList.forEach((todo, i) => {
      if (todo.id === id) {
        todoList.splice(i, 1);
      }
    });
    res.json(todoList);
  } else {
    res.status(400).json({ msg: `item with id ${id} not found` });
  }
});

app.listen(PORT, () => console.log(`server running on ${PORT}`));
