import User from '../models/Users';
import Auth from '../middleware/Auth';
import helper from './helper';


const UserController = {
  /** signUp
   * @desc signup user
   *
   * @method
   *
   * @memberof Usercontroller
   *
   * @param {Object} req Request Object
   * @param {Object} res Response Object
   *
   * @returns {object} Returns created user
   */
  signUp(req, res) {
    const { username, email } = req.body;
    User.findOne({ username, email }).exec((err, userInstance) => {
      if (userInstance !== null) {
        return res.status(409).json({
          success: false,
          message: 'User already exist'
        });
      }
      const newUser = new User(req.body);
      newUser.save((err, createdUser) => {
        if (err) {
          return helper.validateUserError(err, res);
        }

        return res.status(201).json({
          username: createdUser.username,
          name: createdUser.name,
          email: createdUser.email,
          token: Auth.generateToken(createdUser)
        });
      });
    });
  },
  /** signIn
   * @desc signin user
   *
   * @method
   *
   * @memberof Usercontroller
   *
   * @param {Object} req Request Object
   * @param {Object} res Response Object
   *
   * @returns {object} Returns success message
   */
  signIn(req, res) {
    const { email, password } = req.body;
    User.findOne({
      email
    })
      .select(['password', 'email', 'username', 'name'])
      .exec((err, user) => {
        if (err) throw err;
        if (!user) {
          res.status(404).json({
            success: false,
            message: 'User does not exist!'
          });
        } else if (user) {
          const validPassword = user.comparePassword(password);
          if (!validPassword) {
            res.status(401).json({
              success: false,
              message: 'Incorrect Password'
            });
          } else {
            const token = Auth.generateToken(user);
            res.status(200).json({
              success: true,
              message: 'Successfully login!',
              token,
            });
          }
        }
      });
  }
};

export default UserController;
