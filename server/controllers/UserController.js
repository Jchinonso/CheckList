import nodemailer from 'nodemailer';
import jwt from 'jsonwebtoken';
import cloudinary from 'cloudinary-core';
import bcrypt from 'bcrypt-nodejs';
import fs from 'fs';

import sendMail from '../helper/sendMail';
import User from '../models/Users';
import Auth from '../middleware/Auth';
import errorHandler from '../helper/errorHandler';


const UserController = {
  /** signUp
   * @description signup user
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
          message: 'User with email already exist'
        });
      }
      const newUser = new User(req.body);
      newUser.save((err, createdUser) => {
        if (err) {
          return errorHandler.validateUserError(err, res);
        }
        const userObject = UserController.userObject(createdUser);
        return res.status(201).json({
          message: 'Successfully Signed Up',
          userObject,
          token: Auth.generateToken(createdUser)
        });
      });
    });
  },
  /** signIn
   * @description signin user
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
      .select(['password', 'email', 'username', 'name', 'imageUrl'])
      .exec((err, user) => {
        if (err) throw err;
        if (!user) {
          res.status(404).json({
            message: 'User does not exist!'
          });
        } else if (user) {
          const validPassword = user.comparePassword(password);
          if (!validPassword) {
            res.status(401).json({
              message: 'Incorrect Password'
            });
          } else {
            const userObject = UserController.userObject(user);
            res.status(200).json({
              message: 'Successfully login!',
              userObject,
              token: Auth.generateToken(user),
            });
          }
        }
      });
  },
  /**
   * @description User object
   *
   * @memberof Usercontroller
   *
   * @param {object} user object
   *
   * @returns {object} Returns user object
   */
  userObject(user) {
    return {
      userId: user._id,
      username: user.username,
      name: user.name,
      email: user.email,
      imageUrl: user.imageUrl
    };
  },

  /** updateProfile
   * @description update a user
   *
   * @method
   *
   * @memberof Usercontroller
   *
   * @param {Object} req Request Object
   * @param {Object} res Response Object
   *
   * @returns {object} Returns updated user
   */
  updateProfile(req, res) {
    const { email, name } = req.body;
    const { userId } = req.decoded;
    User.findById(userId).select(['email', 'username', 'name', 'imageUrl'])
      .exec((err, user) => {
        if (!user) {
          res.status(404).json({
            message: 'User does not exist!'
          });
        } else if (user) {
          user.email = email;
          user.username = user.username;
          user.name = name;
          user.save((err, updatedUser) => {
            if (err) {
              return errorHandler.validateUserError(err, res);
            }
            res.status(201).json({
              message: 'successfully updated',
              updatedUser,
              token: Auth.generateToken(updatedUser)
            });
          });
        } else {
          res.status(500).json({
            message: 'Internal server error'
          });
        }
      });
  },
  /**
 * @description: update a user profile picture
 *
 * @param {Object} req request object
 * @param {Object} res response object
 *
 * @return {Object} response containing the updated todo
 */
  uploadProfilePicture(req, res) {
    const { imageUrl } = req.body;
    User.findById(req.decoded.userId)
      .select(['email', 'username', 'name'])
      .exec((err, currentUser) => {
        if (currentUser) {
          currentUser.imageUrl = imageUrl;
          currentUser.save((err, updatedUser) => {
            if (err) {
              return res.status(500).json({
                message: 'Internal server error',
              });
            }
            return res.status(201).json({
              message: 'Profile image uploaded',
              updatedUser,
              token: Auth.generateToken(currentUser)
            });
          });
        } else if (!currentUser) {
          return res.status(404).json({
            message: 'User not found',
          });
        }
      });
  },
  /** retrieveAllUsers
   * @desc retrieve all users
   *
   * @method
   *
   * @memberof Usercontroller
   *
   * @param {Object} req Request Object
   * @param {Object} res Response Object
   *
   * @returns {object} Returns all users
   */
  retrieveAllUsers(req, res) {
    User.find({}).select(['username', 'email', 'name'])
      .exec((err, allUsers) => {
        if (allUsers.length === 0) {
          return res.status(404).json({
            message: 'No user found'
          });
        } else if (allUsers.length > 0) {
          return res.status(200).json({
            message: 'Successfully retrieve all users',
            allUsers
          });
        }
        return res.status(500).json({
          message: 'Internal Server error'
        });
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
 * @param {object} req,
 * @param {object } res
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
        return sendMail(user, req, res);
      }
      return res.status(404).json({
        message: 'User with email not found'
      });
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
          { email: decoded.email },
          { password: hashedPassword },
          { upsert: true },
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
   * sign's in user with google account
   */
  googleSignIn(req, res) {
    const {
      username, email, password, name, imageUrl
    } = req.body;
    User.findOne({
      email
    }).exec((err, user) => {
      if (user) {
        const userObject = UserController.userObject(user);
        return res.status(200).json({
          message: 'You have been loggedin successfully',
          userObject,
          token: Auth.generateToken(user)
        });
      }
      const newUser = new User(req.body);
      newUser.save((err, createdUser) => {
        if (err) {
          return errorHandler.validateUserError(err, res);
        }
        const userObject = UserController.userObject(createdUser);
        return res.status(201).json({
          message: 'You have been loggedin successfully',
          userObject,
          token: Auth.generateToken(createdUser)
        });
      });
    });
  }

};

export default UserController;
