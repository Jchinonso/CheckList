import User from '../models/Users';
import Auth from '../middleware/Auth'
import helper from './helper';



const UserController = {
  signUp(req, res) {
    const { username, email } = req.body;
      User.findOne({username, email}).exec((err, userInstance) => {
        if(userInstance) {
          return res.status(409).json({
            message: 'User already exist'
          })
        } else {
          const newUser = new User(req.body);
          newUser.save((err, createdUser) => {
            if(err) {
              return helper.validateServerError(err, res);
            }
            else {
              return res.status(201).json({
                success: true,
                username: createdUser.username,
                name: createdUser.name,
                email: createdUser.email,
                token: Auth.generateToken(createdUser)
              });
            }
          })
        }
      })
  },

  signIn(req, res) {
    const { email, password } = req.body;
    User.findOne({
      email
    })
    .select(['password', 'email', 'username', 'name'])
    .exec(function(err, user) {
      if (err) throw err;
      if (!user) {
        res.status(404).send({message: 'User does not exist!'})
      }
      else if (user) {
        const validPassword = user.comparePassword(password);
        if (!validPassword) {
          res.status(401).send({message: 'Incorrect Password'});
        }
        else {
          const token = Auth.generateToken(user)
          res.json({
            success: true,
            message: 'Successfully login!',
            token,
          })
        }
      }
    })
  }
}

export default UserController;
