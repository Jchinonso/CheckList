import chai from 'chai';
import supertest from 'supertest';
import mongoose from 'mongoose';
import app from '../app';
import User from '../models/Users';

const request = supertest(app);
const expect = chai.expect;

describe('User Controller',() => {
  before((done) => {
    User.remove({}, (err) => {
      if (err) return done(err);
    });
    done();
  });
  it('should send error message if username field is not inputed', (done) => {
    request.post('/api/v1/user/signup')
      .send({
        password: 'poly12345',
        name: 'john onyeabor',
        email: 'joe@gmail.com'
      })
      .set('Accept', 'application/json')
      .end((err, res) => {
        expect(res.status).to.equal(400);
        expect(res.body.message).to.equal('username is required');
        done();
      });
  });
  it('should send error message if email field is not inputed', (done) => {
    request.post('/api/v1/user/signup')
      .send({
        username: 'jchinonso',
        password: 'poly12345',
        name: 'john onyeabor',
      })
      .set('Accept', 'application/json')
      .end((err, res) => {
        expect(res.status).to.equal(400);
        expect(res.body.message).to.equal('email is required');
        done();
      });
  });
  it('should send error message if password field is not inputed', (done) => {
    request.post('/api/v1/user/signup')
      .send({
        username: 'jchinonso',
        name: 'john onyeabor',
        email: 'joe@gmail.com'
      })
      .set('Accept', 'application/json')
      .end((err, res) => {
        expect(res.status).to.equal(400);
        expect(res.body.message).to.equal('password is required');
        done();
      });
  });
  it('should create a new user', (done) => {
    request.post('/api/v1/user/signup')
      .send({
        username: 'jchinonso',
        password: 'poly12345',
        name: 'john onyeabor',
        email: 'joe@gmail.com'
      })
      .set('Accept', 'application/json')
      .end((err, res) => {
        expect(res.body).to.be.an('object');
        expect(res.status).to.equal(201);
        expect(res.body.name).to.equal('john onyeabor');
        expect(res.body.email).to.equal('joe@gmail.com');
        expect(res.body.username).to.equal('jchinonso');
        done();
      });
  });
  it('should send error message if user already exist', (done) => {
    request.post('/api/v1/user/signup')
      .send({
        username: 'jchinonso',
        password: 'poly12345',
        name: 'john onyeabor',
        email: 'joe@gmail.com'
      })
      .set('Accept', 'application/json')
      .end((err, res) => {
        expect(res.status).to.equal(409);
        expect(res.body.message).to.equal('User with email already exist');
        done();
      });
  });
  it('should send validation error for username that already exist', (done) => {
    request.post('/api/v1/user/signup')
      .send({
        username: 'jchinonso',
        password: 'poly12345',
        name: 'john onyeabor',
        email: 'johnny@gmail.com'
      })
      .set('Accept', 'application/json')
      .end((err, res) => {
        expect(res.body.message).to.equal('Error, expected `username` to be unique. Value: `jchinonso`');
        done();
      });
  });
  it('should send error message if username is not between 3 to 25 characters',
    (done) => {
      request.post('/api/v1/user/signup')
        .send({
          username: 'j',
          password: 'poly12345',
          name: 'john onyeabor',
          email: 'johnny@gmail.com'
        })
        .set('Accept', 'application/json')
        .end((err, res) => {
          expect(res.body.message).to.equal('Username should be between 3 and 25 characters');
          done();
        });
    });
  it('should send error message if password is not between 8 to 35 characters',
    (done) => {
      request.post('/api/v1/user/signup')
        .send({
          username: 'jolly',
          password: 'po',
          name: 'john onyeabor',
          email: 'johnny@gmail.com'
        })
        .set('Accept', 'application/json')
        .end((err, res) => {
          expect(res.body.message).to.equal('Password should be between 8 and 35 characters');
          done();
        });
    });
  it('should send error message if password is not between 8 to 35 characters',
    (done) => {
      request.post('/api/v1/user/signup')
        .send({
          username: 'jolly',
          password: 'po',
          name: 'jo',
          email: 'johnny@gmail.com'
        })
        .set('Accept', 'application/json')
        .end((err, res) => {
          expect(res.body.message).to.equal(
            'Name must be at least 3 characters, max 30, no special characters or numbers, must have space in between name.');
          done();
        });
    });
  it('should signin a user if credentials are correct',
    (done) => {
      request.post('/api/v1/user/signin')
        .send({
          password: 'poly12345',
          email: 'joe@gmail.com'
        })
        .set('Accept', 'application/json')
        .end((err, res) => {
          expect(res.status).to.equal(200);
          expect(res.body.message).to.equal('Successfully login!');
          done();
        });
    });
  it('should send error message if password is incorrect',
    (done) => {
      request.post('/api/v1/user/signin')
        .send({
          password: 'poly1234',
          email: 'joe@gmail.com'
        })
        .set('Accept', 'application/json')
        .end((err, res) => {
          expect(res.status).to.equal(401);
          expect(res.body.message).to.equal('Incorrect Password');
          done();
        });
    });
  it('should send error message if user does not exist',
    (done) => {
      request.post('/api/v1/user/signin')
        .send({
          password: 'poly1234',
          email: 'logolas@gmail.com'
        })
        .set('Accept', 'application/json')
        .end((err, res) => {
          expect(res.status).to.equal(404);
          expect(res.body.message).to.equal('User does not exist!');
          done();
        });
    });
  it('should send error message if email is not inputed',
    (done) => {
      request.post('/api/v1/user/signin')
        .send({
          password: 'poly1234',
        })
        .set('Accept', 'application/json')
        .end((err, res) => {
          expect(res.status).to.equal(400);
          expect(res.body.message).to.equal('email is required');
          done();
        });
    });
  it('should send error message if password is not inputed',
    (done) => {
      request.post('/api/v1/user/signin')
        .send({
          email: 'joe@gmail.com'
        })
        .set('Accept', 'application/json')
        .end((err, res) => {
          expect(res.status).to.equal(400);
          expect(res.body.message).to.equal('password is required');
          done();
        });
    });
  it('should signin with google', (done) => {
    request.post('/api/v1/user/googleLogin')
      .send({
        password: 'poly12345',
        email: 'joe@gmail.com'
      })
      .set('Accept', 'application/json')
      .end((err, res) => {
        if (err) return err;
        expect(res.status).to.equal(200);
        expect(res.body.message).to.equal('You have been loggedin successfully');
        return done();
      });
  });
  it('should signup a user with google if user does not exist ', (done) => {
    request.post('/api/v1/user/googleLogin')
      .send({
        username: 'melkol',
        password: 'abacus555',
        email: 'melkol@example.com',
        name: 'collins omojoro'
      })
      .set('Accept', 'application/json')
      .end((err, res) => {
        if (err) return err;
        expect(res.status).to.equal(201);
        expect(res.body.message).to.equal('You have been loggedin successfully');
        return done();
      });
  });
  it('should send a reset password link if user forgot password', (done) => {
    request.post('/api/v1/user/forgotPassword')
      .send({ email: 'joe@gmail.com' })
      .set('Accept', 'application/json')
      .end((err, res) => {
        if (err) return err;
        expect(res.status).to.equal(200);
        expect(res.body.message).to.equal('Please check your mail for the reset link!');
        return done();
      });
  });
  it('should not send a reset password link if user did not provide a valid email', (done) => {
    request.post('/api/v1/user/forgotPassword')
      .send({ email: 'mkdoe@gmail.com' })
      .set('Accept', 'application/json')
      .end((err, res) => {
        if (err) return err;
        expect(res.status).to.equal(404);
        expect(res.body.message).to.equal('User with email not found');
        return done();
      });
  });
});
