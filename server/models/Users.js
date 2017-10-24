
import mongoose from 'mongoose';
import titlize from 'mongoose-title-case';
import uniqueValidator from 'mongoose-unique-validator';
import validate from 'mongoose-validator';
import bcrypt from 'bcrypt-nodejs';
import {Todo} from './Todos';

const nameValidator = [
  validate({
    validator: 'isLength',
    arguments: [3, 20],
    message: 'Name should be between {ARGS[0]} and {ARGS[1]} characters'
  }),
  validate({
    validator: 'matches',
    arguments: /^(([a-zA-Z]{3,20})+[ ]+([a-zA-Z]{3,20})+)+$/,
    message: 'Name must be at least 3 characters, max 30, no special characters or numbers, must have space in between name.'
  })
];


const emailValidator = [
  validate({
    validator: 'isEmail',
    message: 'Email is Invalid'
  })
];

const usernameValidator = [
  validate({
      validator: 'isLength',
      arguments: [3, 25],
      message: 'Username should be between {ARGS[0]} and {ARGS[1]} characters'
  }),
  validate({
      validator: 'isAlphanumeric',
      message: 'Username must contain letters and numbers only'
  })
];

// Password Validator
const passwordValidator = [
  validate({
      validator: 'isLength',
      arguments: [8, 35],
      message: 'Password should be between {ARGS[0]} and {ARGS[1]} characters'
  })
];


const Schema = mongoose.Schema;
const UserSchema = new Schema({
  name: {
    type: String,
    required: true,
    lowercase: true,
    trim: true,
    validate: nameValidator
  },
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    validate: usernameValidator
  },
  password: {
     type: String,
     required: true,
     trim: true,
     validate: passwordValidator,
     select: false
    },
  email: {
     type: String,
     required: true,
     unique: true,
     lowercase: true,
     validate: emailValidator
    },
  todos: [{
    type: Schema.Types.ObjectId,
    ref: Todo
  }],
  image: {
     type: Buffer
    },
  created_at: {
    type: Date,
    default: Date.now()
  },
  updated_at: {
    type: Date,
    default: Date.now()
  }
});


UserSchema.pre('save', function(next) {
  const user = this;

  if (!user.isModified('password')) return next();

  bcrypt.hash(user.password, null, null, function(err, hash) {
      if (err) return next(err);
      user.password = hash;
      next();
  });
});


UserSchema.plugin(titlize, {
  paths: ['name']
});

UserSchema.plugin(uniqueValidator);


UserSchema.methods.comparePassword = function(password) {
  const user = this;
  return bcrypt.compareSync(password, user.password);
};



const User = mongoose.model('User', UserSchema);

export default User;
