import mongoose from 'mongoose';
import validate from 'mongoose-validator';

const { Schema } = mongoose;


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
});

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
  dueDate: {
    type: Date,
  },
  createdAt: {
    type: Date,
    default: Date.now()
  }
});

export const Task = mongoose.model('Task', TaskSchema);
