
import path from 'path';
import express from 'express';
import logger from 'morgan';
import webpack from 'webpack';
import bodyParser from 'body-parser';
import multer from 'multer';
import mongoose from 'mongoose';
import compression from 'compression';
import config from './../webpack.config.dev';
import Routes from './routes/index';

require('dotenv').config();

/* eslint-disable no-console */
const { NODE_ENV, MONGODB_URL, TEST_URL } = process.env;
if (NODE_ENV === 'test') {
  mongoose.connect(TEST_URL);
} else {
  mongoose.connect(MONGODB_URL);
}

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
  console.log('database connected!');
});

const app = express();
const router = express.Router();
const compiler = webpack(config);

if (NODE_ENV === 'development') {
  app.use(require('webpack-dev-middleware')(compiler, {
    noInfo: true,
    publicPath: config.output.publicPath
  }));
  app.use(require('webpack-hot-middleware')(compiler));
}

if (NODE_ENV !== 'developmemt') {
  app.use(compression());
  app.use(express.static('dist'));
}

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

Routes(router);

// prefix /api for all routes
app.use('/api/v1', router);

if (NODE_ENV === 'developmemt') {
  app.get('*', (req, res) => res.status(200)
    .sendFile(path.join(__dirname, './../client', 'index.html')));
}

if (NODE_ENV !== 'development') {
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../dist/index.html'));
  });
}


module.exports = app;
