require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const Task = require('./models/Task');
const connectToMongo = require('./db');


const app = express(); // ✅ Define app first
const port = process.env.PORT || 3000;

// Middleware
app.use(express.json());

// Serve static files
app.use(express.static(path.join(__dirname, 'public')));

// --- ROUTES ---

app.get('/tasks', async (req, res) => {
  try {
    const tasks = await Task.find();
    res.json(tasks);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

app.post('/tasks', async (req, res) => {
  const task = new Task({ description: req.body.description });

  try {
    const newTask = await task.save();
    res.status(201).json(newTask);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

app.patch('/tasks/:id', async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);
    if (!task) return res.status(404).send('Task not found');

    task.isCompleted = req.body.isCompleted;
    const updatedTask = await task.save();
    res.json(updatedTask);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

app.delete('/tasks/:id', async (req, res) => {
  try {
    const result = await Task.deleteOne({ _id: req.params.id });

    if (result.deletedCount === 0) {
      return res.status(404).json({ message: 'Task not found' });
    }

    res.json({ message: 'Task deleted' });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

if (process.env.NODE_ENV !== 'test') {
  connectToMongo().then(() => {
    app.listen(port, () => {
    console.log(`🚀 Server running on port ${port}`);
    });
  });
}

module.exports = app;
