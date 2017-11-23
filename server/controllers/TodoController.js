import cron from 'node-cron';

import { Todo, Task } from '../models/Todos';
import User from '../models/Users';
import { sendNotification, sendReminders, requiresNotification } from '../helper/reminders';


const TodoController = {

  /** Create Todos
   * @desc Create a new Todo
   *
   * @method
   *
   * @memberof Todo controller
   *
   * @param {Object} req Request Object
   * @param {Object} res Response Object
   *
   * @returns {object} Returns new created Todo
   */

  createTodos(req, res) {
    const { text } = req.body;
    if (text === undefined) {
      return res.status(400).json({
        message: 'text is required',
      });
    } else if (typeof text !== 'string') {
      return res.status(400).json({
        message: 'text must be a string',
      });
    }
    const formTodo = {
      text: req.body.text,
      creator: req.decoded.userId,
      collaborators: [req.decoded.userId]
    };
    const newTodo = new Todo(formTodo);
    Promise.resolve(newTodo.save((err, createdTodo) => {
      if (err) {
        return res.status(500).json({
          message: 'Internal Server Error'
        });
      }
    })).then(() => {
      Todo.findOne({ text: req.body.text })
        .populate({ path: 'creator', select: ['name', 'username'] })
        .exec((err, todo) => {
          if (err) {
            return res.status(500).json({
              message: 'Internal Server Error'
            });
          }
          return res.status(201).json({
            todo
          });
        });
    });
  },
  /** Retrieve Todos
   * @desc Retrieve all Todos
   *
   * @method
   *
   * @memberof Todo controller
   *
   * @param {Object} req Request Object
   * @param {Object} res Response Object
   *
   * @returns {object} Returns all Todos
   */
  retrieveAllTodos(req, res) {
    const { userId } = req.decoded;
    Todo.find({})
      .populate({ path: 'creator', select: ['username', 'name'] })
      .populate({ path: 'collaborators', select: ['username', 'name'] })
      .populate({ path: 'tasks' })
      .exec((err, todos) => {
        const newTodo = todos.filter(todo => todo.collaborators
          .some(collab => collab._id == userId));
        if (todos.length === 0) {
          res.status(404).json({
            success: false,
            message: 'No todos found'
          });
        } else if (todos.length > 0) {
          res.status(200).json({
            newTodo
          });
        } else {
          res.status(500).json({
            message: 'Internal Server error'
          });
        }
      });
  },
  /** addTask
   * @desc Add Task To a Todo
   *
   * @method
   *
   * @memberof Todo controller
   *
   * @param {Object} req Request Object
   * @param {Object} res Response Object
   *
   * @returns {object} Returns new created Task for a Todo
   */
  addTask(req, res) {
    const { todoId } = req.params;
    const {
      text, priority, dueDate, completed
    } = req.body;
    if (text === undefined || text === '') {
      return res.status(400).json({
        success: false,
        message: 'text is required',
      });
    } else if (typeof text !== 'string') {
      return res.status(400).json({
        message: 'text must be a string',
      });
    }
    Todo.findById({ _id: todoId }).exec((err, todo) => {
      const newTaskForm = {
        text,
        priority,
        completed,
        dueDate,
        todoName: todo.text,
        creatorEmail: req.decoded.email
      };
      const newTask = new Task(newTaskForm);
      if (todo) {
        Promise.resolve(newTask.save((err, task) => {
          if (err) {
            res.status(500).json({
              message: 'Internal server error'
            });
          }
          res.status(201).json({
            task
          });
        })).then(() => {
          todo.tasks.push(newTask);
          todo.save((err, newTodo) => {
            if (err) {
              res.status(500).json({
                message: 'Internal server error'
              });
            }
          });
        });
      } else if (todo === null) {
        res.status(404).json({
          message: 'Todo does not exist'
        });
      }
    });
  },
  /** addColaborator
   * @desc Add Collaborator To a Todo
   *
   * @method
   *
   * @memberof Todo controller
   *
   * @param {Object} req Request Object
   * @param {Object} res Response Object
   *
   * @returns {object} Returns a success message
   */
  addColaborator(req, res) {
    const { todoId } = req.params;
    const members = [].concat(req.body);
    User.find({ username: members }).select(['username']).exec((err, user) => {
      if (user.length !== 0) {
        Todo.findById({ _id: todoId })
          .populate({ path: 'collaborators', select: ['username'] })
          .exec((err, todo) => {
            if (todo) {
              const collaborators = user.filter(newUser =>
                !todo.collaborators.find(collab => collab.username === newUser.username));
              todo.collaborators = [...todo.collaborators, ...collaborators];
              todo.save((err, newTodo) => {
                if (err) throw err;
                res.status(200).json({
                  message: 'Collaborator have be successfully added',
                  newTodo
                });
              });
            } else if (!todo) {
              res.status(404).json({
                message: 'Todo Not found'
              });
            } else {
              res.status(500).json({
                success: false,
                message: 'Internal server error'
              });
            }
          });
      } else {
        res.status(404).json({
          message: 'User does not exist'
        });
      }
    });
  },
  /** retrieveAllColaborators
   * @desc get all Collaborators that belong to Todo
   *
   * @method
   *
   * @memberof Todo controller
   *
   * @param {Object} req Request Object
   * @param {Object} res Response Object
   *
   * @returns {object} Returns a all collaborators
   */
  retrieveAllColaborators(req, res) {
    const { text, completed } = req.body;
    const id = req.params.todoId;
    Todo.findById({ _id: id })
      .populate({ path: 'collaborators', select: ['username'] })
      .exec((err, todo) => {
        if (todo) {
          const { collaborators } = todo;
          res.status(200).json({
            collaborators
          });
        } else if (todo === null) {
          res.status(404).json({
            message: 'Todo does not exist'
          });
        } else if (err) {
          res.status(500).json({
            message: 'Internal server error'
          });
        }
      });
  },
  /** updateTask
   * @desc update todo task
   *
   * @method
   *
   * @memberof Todo controller
   *
   * @param {Object} req Request Object
   * @param {Object} res Response Object
   *
   * @returns {object} Returns edited task
   */
  updateTask(req, res) {
    const id = req.params.taskId;
    Task.findById({ _id: id }).exec((err, task) => {
      if (task) {
        const { completed, text, dueDate } = req.body;
        task.dueDate = dueDate !== undefined ? dueDate : task.dueDate;
        task.completed = completed !== undefined ? completed : task.completed;
        task.text = text || task.text;
        task.save((err, editedTask) => {
          if (err) {
            res.status(500).json({
              message: 'Internal server error'
            });
          } else {
            res.status(201).json({
              editedTask
            });
          }
        });
      } else if (!task) {
        res.status(404).json({
          message: 'No task found'
        });
      } else {
        res.status(500).json({
          message: 'Internal server error'
        });
      }
    });
  },
  /** retrieveAllTasks
   * @desc update todo task
   *
   * @method
   *
   * @memberof Todo controller
   *
   * @param {Object} req Request Object
   * @param {Object} res Response Object
   *
   * @returns {object} Returns all tasks
   */
  retrieveAllTasks(req, res) {
    const { text, completed } = req.body;
    const id = req.params.todoId;
    Todo.findById({ _id: id })
      .populate({ path: 'tasks' })
      .exec((err, todo) => {
        if (todo) {
          const { tasks } = todo;
          res.status(200).json({
            message: 'Task successfully retrieved',
            tasks
          });
        } else if (todo === null) {
          res.status(404).json({
            message: 'Todo does not exist'
          });
        } else if (err) {
          res.status(500).json({
            message: 'Internal server error'
          });
        }
      });
  },
  /** deleteTask
   * @desc delete todo task
   *
   * @method
   *
   * @memberof Todo controller
   *
   * @param {Object} req Request Object
   * @param {Object} res Response Object
   *
   * @returns {object} Returns success message
   */
  deleteTask(req, res) {
    const id = req.params.taskId;
    Task.findByIdAndRemove({ _id: id }, (err, task) => {
      if (task) {
        res.status(200).json({
          message: 'Successfully deleted',
          task
        });
      } else if (!task) {
        res.status(404).json({
          message: 'Task not found'
        });
      } else {
        res.status(500).json({
          message: 'Internal server error'
        });
      }
    });
  },
  CronJob() {
    cron.schedule('* * * * *', () => {
      sendNotification();
    });
  }
};
export default TodoController;
