import nodemailer from 'nodemailer';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt-nodejs';
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
    User.findOne({ email }).exec((err, userInstance) => {
      if (userInstance !== null) {
        return res.status(409).json({
          success: false,
          message: 'User with email already exist'
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
  },
  /**
 * forgotPassword
 *
 * @desc Send mail to reset user password
 *
 * @method
 *
 * @memberof UserController
 *
 * @param {object} req, res
 *
 * @returns {function} Express function which sends
 *
 */

  forgotPassword(req, res) {
    const { email } = req.body;
    User.findOne({
      email
    }).exec((err, user) => {
      if (user) {
        const token = Auth.generateToken(user);
        const transporter = nodemailer.createTransport({
          service: 'gmail',
          secure: false,
          auth: {
            user: 'noreply.worklist@gmail.com',
            pass: process.env.PASSWORD
          },
          tls: {
          }
        });
        const mailOptions = {
          from: 'noreply.worklist@gmail.com',
          to: req.body.email,
          subject: 'Reset Password',
          html: `<p>You have received this mail because you asked to reset your account on WorkList. Please
          <a href="http://${process.env.SITE_URL}/reset-password?secret=${token}">Click here</a> to begin the process</p><br />
          <p>Please ignore this mail if you did not make this request.</p>
          <p>Note: This link will expire after one hour</p>`,
        };
        transporter.sendMail(mailOptions, (error) => {
          if (error) {
            return res.status(501).json({
              message: 'Failure delivery'
            });
          }
          return res.status(200).json({
            message: 'Please check your mail for the reset link!'
          });
        });
      } else {
        return res.status(404).json({
          message: 'User with email not found'
        });
      }
    });
  },

  /** resetPassword
   * @desc reset user password
   *
   * @method
   *
   * @memberof UserController
   *
   * @param {object} req
   * @param {object} res
   *
   * @returns {function} reset password
   */
  resetPassword(req, res) {
    const { newPassword, retypePassword, token } = req.body;
    if (newPassword === retypePassword) {
      jwt.verify(token, process.env.JWT_SECRET_TOKEN, (error, decoded) => {
        if (error) {
          return res.status(401).json({
            message: 'This link has expired or is invalid. Please try again'
          });
        }
        const salt = bcrypt.genSaltSync(10);
        const hashedPassword = bcrypt.hashSync(newPassword, salt);
        User.findOneAndUpdate(
          { email: decoded.email }, { password: hashedPassword }, { upsert: true },
          (err, newRecord) => {
            if (err) throw err;
            if (newRecord) {
              return res.status(201).json({
                message: 'password reset successful, Please login to continue!'
              });
            }
          }
        );
      });
    } else {
      return res.status(400).json({
        message: 'Password does not match'
      });
    }
  },
  /**
   * googleSignIn
   *
   * @desc signs user in via gmail
   *
   * @method
   *
   * @memberof UserController
   *
   * @param {object} req
   * @param {object} res
   *
   * @returns {function} Express function that
   *
   */
  googleSignIn(req, res) {
    const { username, email, password, name } = req.body;
    User.findOne({
      email
    }).exec((err, user) => {
      if (user) {
        return res.status(200).json({
          message: 'You have been loggedin successfully',
          token: Auth.generateToken(user)
        });
      }
      const newUser = new User(req.body);
      newUser.save((err, createdUser) => {
        if (err) {
          return helper.validateUserError(err, res);
        }
        return res.status(201).json({
          message: 'You have been loggedin successfully',
          token: Auth.generateToken(createdUser)
        });
      });
    });
  }

};

export default UserController;
