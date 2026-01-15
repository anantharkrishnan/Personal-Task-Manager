const express = require('express');
const taskRouter = express.Router();
const authUser= require('../middlewares/authUser')

const {
  getTasks,
  createTask,
  updateTask,
  deleteTask,
} = require('../controllers/taskController');

taskRouter.get('/alltasks', authUser, getTasks);
taskRouter.post('/create', authUser, createTask);
taskRouter.put('/update/:id', authUser, updateTask);
taskRouter.delete('/delete/:id', authUser, deleteTask);

module.exports = taskRouter;
