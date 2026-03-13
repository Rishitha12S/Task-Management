const express = require("express");
const cors = require("cors");

const app = express();

app.use(express.json());
app.use(cors());

// Temporary storage
let tasks = [];

// GET all tasks
app.get("/api/tasks", (req, res) => {
    res.json(tasks);
});

// ADD new task
app.post("/api/tasks", (req, res) => {
    const task = {
        id: Date.now(),
        title: req.body.title,
        description: req.body.description,
        status: "Pending"
    };

    tasks.push(task);
    res.json(task);
});

// DELETE task
app.delete("/api/tasks/:id", (req, res) => {
    const id = parseInt(req.params.id);
    tasks = tasks.filter(task => task.id !== id);
    res.json({ message: "Task deleted" });
});

app.listen(5000, () => {
    console.log("Server running on port 5000");
});