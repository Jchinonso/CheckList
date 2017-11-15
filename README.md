[![Build Status](https://travis-ci.org/Jchinonso/WorkList.svg?branch=staging)](https://travis-ci.org/Jchinonso/WorkList)
[![Coverage Status](https://coveralls.io/repos/github/Jchinonso/WorkList/badge.svg?branch=feature%2F%23152341151%2Fjwt-signin)](https://coveralls.io/github/Jchinonso/WorkList?branch=feature%2F%23152341151%2Fjwt-signin)
[![Maintainability](https://api.codeclimate.com/v1/badges/5a3d34911e09a90f7d8a/maintainability)](https://codeclimate.com/github/Jchinonso/WorkList/maintainability)

# WorkList
Worklist is a simple todo list application that allows users to create lists of tasks to be completed and track their progress on these tasks.

Development
-------------
The application was developed with [NodeJs](http://nodejs.org) and [Express](http://expressjs.com) is used for routing. The [MongoDb](http://https://www.mongodb.com) database was used with [mongoose](http://mongoosejs.com) as the ODM
The frontend was built using reactJs with redux framework.

API DOCUMENTATION
-----------------
The API has routes, each dedicated to a single task that uses HTTP response codes to indicate API status and errors.

#### API Features
The following features make up the PostIt Application Api:

#### Authentication
- It makes use of jsonwebtoken(jwt) for authentication
- It generates a token on successful login and send it as part of response
- It accepts the generated token before given access to all the protected routes

###### Users
- It allows users to be created.  
- It allows users to login  
- IT allows users to edit their profile


###### Todos
- It allows new Todo to be created by user.  
- It ensures Todos are accessible based on the permission specified.  
- It allows creator of todo to add collaborators to the todo
- It ensures members can add task and retrieve task from todos


---
## Below are the API endpoints and their functions
EndPoint                              |   Functionality
--------------------------------------|------------------------
POST /api/v1/user/signin              |   Logs a user in.
POST /api/v1/user/signup              |   Create a new user.            
GET /api/v1/users                     |   Get all users.
POST /api/v1/todo                     |   Creates a new todo.
POST /api/v1/todos/todoId/collaborator|   Add collaborator to todo.
POST /api/v1/todos/todoId/task        |   Add task to todo.
GET  /api/v1/todos/todoId/task        |   Get all tasks.
GET /api/v1/todos/todoId/collaborators|   Get all collaborators.
GET /api/v1/todo                      |   Get all todos
PATCH /api/v1/todos/todoId/task/taskId|   Update a task


#### Routes
* POST `/api/v1/user/signup` Use this route to create an account. The following fields are required:
  * `username` The first name of the new user
  * `email`     Email address of the new user
  * `password` A secure password
  * `name` full name of the new user

* POST `/api/v1/user/signin` Use this route to sign in to the application. The following fields are required:
  * `email`     Email address of the new user
  * `password` A secure password

* POST `/api/v1/todo` Use this route to create a new todo. The following fields are required:
  * `text`  The title of the group

* POST `/api/v1/todo/<todoId>/collaborator` Use this route to add a collaborator to a pre-existing todo
  * `username` The username of a user registered on the application
  

* POST `/api/todo/<todoId>/task` Use this route to add task todo
  * `text` The title of the task
  * `priority` The priority of the task to be completed
  * `Due Date` The due date of the task in order to get reminder
  * `completed` The boolean to check that the task is completed

Technologies Used
-----------------

* [NodeJS:](https://nodejs.org/en/) is an open-source, cross-platform JavaScript run-time environment for executing JavaScript code on the server-side.
* [Javascript ES6:](https://en.wikipedia.org/wiki/ECMAScript) ES6 is the sixth major release of the javascript language specification. It enables features like constants, arrow functions, template literals, spread opeartor, etc.
* [React:](https://facebook.github.io/react/tutorial/tutorial.html) Facebook open source, efficient, javascript library for building front-end projects.
* [MongoDB:](https://www.mongodb.com/) PostgreSQL is a powerful, open source object-relational database system (ORDBMS) that offers modern database features such as complex queries, foreign keys, etc.
* [Mongoose:](http://mongoosejs.com/) Sequelize is a promise-based ORM for Node.js that supports different dialects such PostgreSQL, MySQL, and SQLite.
* [Babel:](https://babeljs.io/)  Babel transpiles es6 codes to es5.
* [Webpack:](https://webpack.github.io/docs/what-is-webpack.html) Webpack is used to bundle modules and does tasks automation.
* [Axios:](https://www.npmjs.com/package/axios) Axios is an http client library used in consuming API.

Installation
------------
1.  Ensure you have NodeJs and postgres installed
2.  Clone the repository `https://github.com/jchinonso/WorkList`
3.  Change your directory `cd WorkList`
4.  Install all dependencies `npm install`
5.  Start the app `npm run start:dev` for development Or
6.  Run `npm start` to use transpiled code
7.  Use [postman](https://www.getpostman.com/) to consume the API

Tests
-----
*  The tests have been written using Mocha framework and Chai assertion library
*  Run the test with `npm test`

Limitations
-----------
- Todo creator cannot remove collaborators from todos
- Users cannot delete Todos
- Users cannot deactivate their accounts

Coding Style
------------
- Airbnb: Airbnb is a coding style guide that guides developers to write clean codes

How to Contribute
-----------------
- Fork this repository.
- Clone it.
- Create your feature branch on your local machine with ```git checkout -b your-feature-branch```
- Push your changes to your remote branch with ```git push origin your-feature-branch```
- Open a pull request to the master branch, and describe how your feature works
- Refer to this wiki for proper <a href="https://github.com/Jchinonso/WorkList/wiki">GIT CONVENTION</a>

Ensure your codes follow <a href="https://github.com/airbnb/javascript">AirBnB Javascript Styles Guide</a>

The full API documentation can be viewed at <a href="http://worklist.getforge.io/#introduction" target="_blank">here</a>

### Author
Johnson Chinonso
