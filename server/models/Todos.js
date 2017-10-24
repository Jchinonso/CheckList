import mongoose from 'mongoose';
import validate from 'mongoose-validator';

const Schema = mongoose.Schema;

// const textValidator = [
//   validate({
//       validator: 'isLength',
//       arguments: [3, 25],
//       message: 'Text should be between {ARGS[0]} and {ARGS[1]} characters'
//   }),
//   validate({
//       validator: 'isString',
//       message: 'Text must beletters'
//   })
// ];

const TodoSchema = new Schema({
  text: {
    type: String,
    required: true,
  },
  creator: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  collaborators: [{
    type: Schema.Types.ObjectId,
    ref: 'User'
  }],
  tasks: [{
    type: Schema.Types.ObjectId,
    ref: 'Task'
  }]
})

export const Todo = mongoose.model('Todo', TodoSchema);

const TaskSchema = new Schema({
  text: {
    type: String,
    required: true,
  },
  completed: {
    type: Boolean,
    default: false
  },
  priority: {
    type: String,
    default: 'normal'
  },
  task_completer: {
    type: String,
    default: ''
  },
})

export const Task = mongoose.model('Task', TaskSchema);


