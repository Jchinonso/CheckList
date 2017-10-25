import chai from 'chai';
import supertest from 'supertest';
import mongoose from 'mongoose';
import app from '../app';
import Todo from '../models/Todos';
import User from '../models/Users';

const request = supertest(app);
const expect = chai.expect;
let token;
let todoId;
let taskId;

describe('Todo Controller', () => {
   before((done) => {
    request.post('/api/v1/user/signup')
    .send({
      name: 'kunle adewale',
      email: 'kunle@gmail.com',
      password: 'password',
      username: 'kool4life'
    })
    .end((err, res) => {
      token = res.body.token;
      done()
    })
   })
   after((done) => {
     Promise.resolve(
       User.remove({}, (err) => {
        if (err) return done(err);
      })
    ).then(() => {
      Todo.remove({}, (err) => {
        if (err) return done(err);
      })
    })
    done();
  })
  it('should create new Todo', (done) => {
    request.post('/api/v1/todo')
    .send({
      text: 'NewTOdo'
    })
    .set('x-access-token', token)
    .set('Accept', 'application/json')
    .end((err, res) => {
      todoId = res.body.todo._id;
      expect(res.body).to.be.an('object');
      expect(res.status).to.equal(201);
      expect(res.body.success).to.equal(true);
      expect(res.body.todo).to.be.an('object');
      done();
    });
  })
  it('should validate text input', (done) => {
    request.post('/api/v1/todo')
    .send()
    .set('x-access-token', token)
    .set('Accept', 'application/json')
    .end((err, res) => {
      expect(res.status).to.equal(400);
      expect(res.body.success).to.equal(false);
      expect(res.body.message).to.equal('text is required');
      done();
    });
  })
  it('should retrieve all todos', (done) => {
    request.get('/api/v1/todo')
    .set('x-access-token', token)
    .set('Accept', 'application/json')
    .end((err, res) => {
      expect(res.status).to.equal(200);
      expect(res.body).to.be.an('object');
      expect(res.body.success).to.equal(true);
      expect(res.body.newTodo).to.be.an('array');
      done();
    });
  })
  it('should add tasks to todo', (done) => {
    request.post(`/api/v1/todos/${todoId}/task`)
    .send({
      text: 'myTask'
    })
    .set('x-access-token', token)
    .set('Accept', 'application/json')
    .end((err, res) => {
      taskId = res.body.task._id
      expect(res.status).to.equal(201);
      expect(res.body).to.be.an('object');
      expect(res.body.success).to.equal(true)
      done();
    });
  })
  it('should not add task if Todo doesnot exist', (done) => {
    request.post('/api/v1/todos/1/task')
    .send({
      text: 'myTask'
    })
    .set('x-access-token', token)
    .set('Accept', 'application/json')
    .end((err, res) => {
      expect(res.status).to.equal(409);
      expect(res.body.message).to.equal('Todo does not exist')
      expect(res.body.success).to.equal(false)
      done();
    });
  })
  it('should vadidate text input', (done) => {
    request.post(`/api/v1/todos/${todoId}/task`)
    .send()
    .set('x-access-token', token)
    .set('Accept', 'application/json')
    .end((err, res) => {
      expect(res.status).to.equal(400);
      expect(res.body.success).to.equal(false);
      expect(res.body.message).to.equal('text is required')
      done();
    });
  })
  it('should add collaborators to Todo', (done) => {
    request.post(`/api/v1/todos/${todoId}/collaborator`)
    .send({
      username: 'kool4life'
    })
    .set('x-access-token', token)
    .set('Accept', 'application/json')
    .end((err, res) => {
      expect(res.status).to.equal(200);
      expect(res.body.success).to.equal(true);
      expect(res.body.message).to.equal('Collaborator have be successfully added')
      done();
    });
  })
  it('should not add collaborators to Todo if user does not exist',
  (done) => {
    request.post(`/api/v1/todos/${todoId}/collaborator`)
    .send({
      username: 'jane4real'
    })
    .set('x-access-token', token)
    .set('Accept', 'application/json')
    .end((err, res) => {
      expect(res.status).to.equal(404);
      expect(res.body.success).to.equal(false);
      expect(res.body.message).to.equal('User does not exist')
      done();
    });
  })
  it('should update a task ', (done) => {
    request.put(`/api/v1/todos/task/${taskId}`)
    .send({
      text: 'go to get goceries',
    })
    .set('x-access-token', token)
    .set('Accept', 'application/json')
    .end((err, res) => {
      expect(res.status).to.equal(201);
      expect(res.body).to.be.an('object');
      expect(res.body.success).to.equal(true);
      expect(res.body.editedTask).to.be.an('object');
      done();
    });
   })
   it('should update task completer when completed is true', (done) => {
    request.put(`/api/v1/todos/task/${taskId}`)
    .send({
      text: 'go to get goceries',
      completed: 'true'
    })
    .set('x-access-token', token)
    .set('Accept', 'application/json')
    .end((err, res) => {
      expect(res.status).to.equal(201);
      expect(res.body).to.be.an('object');
      expect(res.body.success).to.equal(true);
      expect(res.body.editedTask.task_completer).to.equal('kool4life');
      done();
    });
   })
   it('should delete a task', (done) => {
    request.delete(`/api/v1/todos/task/${taskId}`)
    .set('x-access-token', token)
    .set('Accept', 'application/json')
    .end((err, res) => {
      expect(res.status).to.equal(200);
      expect(res.body.success).to.equal(true);
      expect(res.body.message).to.equal('Successfully deleted');
      done();
      return app.close();
    });
   })
})


