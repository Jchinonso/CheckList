import { Todo, Task } from '../models/Todos';
import User from '../models/Users';


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
        success: false,
        message: 'text is required',
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
          success: false,
          message: 'Internal Server Error'
        });
      }
    })).then(() => {
      Todo.findOne({ text: req.body.text })
        .populate({ path: 'creator', select: ['name', 'username'] })
        .exec((err, todo) => {
          if (err) {
            return res.status(500).json({
              success: false,
              message: 'Internal Server Error'
            });
          }
          return res.status(201).json({
            success: true,
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
        const newTodo = todos.filter(todo => todo.collaborators.some(collab => collab._id == userId));
        if (todos.length === 0) {
          res.status(404).json({
            success: false,
            message: 'No todos found'
          });
        } else if (todos.length > 0) {
          res.status(200).json({
            success: true,
            newTodo
          });
        } else {
          res.status(500).json({
            success: false,
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
    const { text, priority, completed } = req.body;
    if (text === undefined || text === '') {
      return res.status(400).json({
        success: false,
        message: 'text is required',
      });
    }
    const newTaskForm = {
      text,
      priority,
      completed
    };
    const newTask = new Task(newTaskForm);
    Todo.findById({ _id: todoId }).exec((err, todo) => {
      if (todo) {
        Promise.resolve(newTask.save((err, task) => {
          if (err) {
            res.status(500).json({
              success: false,
              message: 'Internal server error'
            });
          }
          res.status(201).json({
            success: true,
            task
          });
        })).then(() => {
          todo.tasks.push(newTask);
          todo.save((err, newTodo) => {
            if (err) {
              res.status(500).json({
                success: false,
                message: 'Internal server error'
              });
            }
          });
        });
      } else if (!todo) {
        res.status(404).json({
          success: false,
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
            if (err) {
              res.status(500).json({
                success: false,
                message: 'Internal server error'
              });
            } else {
              const collaborators = user.filter((newUser) => {
                return !todo.collaborators.find((collab) => {
                  return collab.username === newUser.username; });
              });
              todo.collaborators = [...todo.collaborators, ...collaborators];
              todo.save((err, newTodo) => {
                if (err) throw err;
                res.status(200).json({
                  success: true,
                  message: 'Collaborator have be successfully added',
                  newTodo
                });
              });
            }
          });
      } else {
        res.status(404).json({
          success: false,
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
            success: true,
            collaborators
          });
        } else if (todo === null) {
          res.status(404).json({
            success: false,
            message: 'Todo does not exist'
          });
        } else if (err) {
          res.status(500).json({
            success: false,
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
    const { completed } = req.body;
    const id = req.params.taskId;
    Task.findById({ _id: id }).exec((err, task) => {
      if (err) {
        res.status(500).json({
          success: false,
          message: 'Internal server error'
        });
      }
      task.completed = completed;
      task.save((err, editedTask) => {
        if (err) {
          res.status(500).json({
            success: false,
            message: 'Internal server error'
          });
        } else {
          res.status(201).json({
            success: true,
            editedTask
          });
        }
      });
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
            success: true,
            tasks
          });
        } else if (todo === null) {
          res.status(404).json({
            success: false,
            message: 'Todo does not exist'
          });
        } else if (err) {
          res.status(500).json({
            success: false,
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
      if (err) {
        res.status(500).json({
          success: false,
          message: 'Internal server error'
        });
      }
      res.status(200).json({
        success: true,
        message: 'Successfully deleted'
      });
    });
  }
};


export default TodoController;
