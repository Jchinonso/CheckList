import path from 'path';
import http from 'http';
import express from 'express';
import logger from 'morgan';
import bodyParser from 'body-parser';
import multer from 'multer';
import mongoose from 'mongoose';
import Routes from './routes/index';
require('dotenv').config();

const { NODE_ENV, MONGODB_URL, TEST_URL } = process.env;
if(NODE_ENV === 'test') {
  mongoose.connect(TEST_URL)
} else {
  mongoose.connect(MONGODB_URL)
}


const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log('database connected!' )
});


/* eslint-disable no-console */
const app = express();
const router = express.Router();


app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

Routes(router);

// prefix /api for all routes
app.use('/api/v1', router);


app.get('*', (req, res) => res.status(200).send('Welcome to awesomeness'))

module.exports = http.createServer(app);
