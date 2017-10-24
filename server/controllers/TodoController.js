import {Todo, Task }from '../models/Todos';
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
    const {text} = req.body;
    if(text === undefined) {
      return res.status(400).json({
        success: false,
        message: 'text is required',
      })
    } else {
      const formTodo = {
        text: req.body.text,
        creator: req.decoded.userId,
        collaborators: [req.decoded.userId]
      }
      const newTodo = new Todo(formTodo);
      Promise.resolve(
        newTodo.save((err, createdTodo) => {
          if(err) {
            return res.status(500).json({
              success: false,
              message: 'Internal Server Error'
            })
          }
        })
      ).then(() => {
        Todo.findOne({text: req.body.text})
        .populate({ path: 'creator', select: ['name', 'username']})
        .populate({path:'collaborators', select: ['username']})
        .exec((err, todo) => {
        if(err) {
          return res.status(500).json({
            success: false,
            message: 'Internal Server Error'
          })
        }
        return res.status(201).json({
          success: true,
          todo
        })
        })
      })
    }
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
    const userId = req.decoded.userId;
    Todo.find({})
    .populate({path: 'creator', select: ['username', 'name']}, )
    .populate({path: 'collaborators', select: ['username', 'name']})
    .populate({path: 'tasks'})
    .exec((err, todos) => {
      const newTodo  = todos.filter((todo) => {
        return todo.collaborators.some((collab) => {
          return collab._id == userId
        })
      })
      if(err) {
        res.status(500).json({
          success: false,
          message: 'Internal Server error'
        })
      }
      res.status(200).json({
        success: true,
        newTodo
      });
    })

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
    const todoId = req.params.todoId;
    const { text, priority, completed} = req.body;
    if(text === undefined) {
      return res.status(400).json({
        success: false,
        message: 'text is required',
      })
    } else {
      const newTaskForm = {
        text,
        priority,
        completed
      }
      const newTask = new Task(newTaskForm);
      Todo.findById({_id: todoId}).exec((err, todo) => {
        if(todo) {
          Promise.resolve(
            newTask.save((err, task) => {
              if(err) {
                res.status(500).json({
                  success:false,
                  message: 'Internal server error'
                })
              }
              res.status(201).json(task)
            })
          ).then(() => {
            todo.tasks.push(newTask)
            todo.save((err, newTodo) => {
              if(err) {
                res.status(500).json({
                  success: false,
                  message: 'Internal server error'
                })
              }
            })
          })
        } else if (!todo) {
          res.status(409).json({
            success: false,
            message: 'Todo does not exist'
          })
        }
      })
    }
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
    const todoId = req.params.todoId;
    const { username } = req.body
    User.findOne({ username}).select(['username']).exec((err, user) => {
      if(user) {
        Todo.findById({_id: todoId}).exec((err, todo) => {
          if(err) {
            res.status(500).json({
              success: false,
              message: 'Internal server error'
            })
          }
          todo.collaborators.push(user)
          todo.save((err, newTodo) => {
            if(err) throw err
            res.status(201).json({
              success: true,
              message: 'Collaborator have be successfully added',
            })
          })
        })
      } else {
        res.status(404).json({
          success: false,
          message: 'User does not exist'
        })
      }
    })
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
    const { text, completed } = req.body;
    const id = req.params.taskId;
    Task.findById({_id: id}).exec((err, task) => {
      if(err) {
        res.status(500).json({
          success: false,
          message: 'Internal server error'
        })
      }
      if(completed === 'true') {
        task.task_completer = req.decoded.username;
      } else {
        task.task_completer = '';
      }
      task.completed = completed;
      task.text = text;
      task.save((err, editedTask) => {
        if(err) {
          res.status(500).json({
            success: false,
            message: 'Internal server error'
          })
        }
        res.status(200).json({
          success: true,
          editedTask
        });
      })
    })
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
    Task.findByIdAndRemove({_id: id}, (err, task) => {
      if(err) {
        res.status(500).json({
          success: false,
          message: 'Internal server error'
        })
      }
      res.json({
        message: 'Successfully deleted'
      })
    })
  }
}


export default TodoController;
