[![Build Status](https://travis-ci.org/Jchinonso/WorkList.svg?branch=staging)](https://travis-ci.org/Jchinonso/WorkList)
[![Coverage Status](https://coveralls.io/repos/github/Jchinonso/WorkList/badge.svg?branch=feature%2F%23152341151%2Fjwt-signin)](https://coveralls.io/github/Jchinonso/WorkList?branch=feature%2F%23152341151%2Fjwt-signin)
[![Maintainability](https://api.codeclimate.com/v1/badges/5a3d34911e09a90f7d8a/maintainability)](https://codeclimate.com/github/Jchinonso/WorkList/maintainability)

# CheckList
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
- It allows creator of group to add collaborators to the todos
- It ensures members of group can add and retrieve messages to group and from group 


---
