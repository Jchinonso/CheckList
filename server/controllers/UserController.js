import nodemailer from 'nodemailer';
import jwt from 'jsonwebtoken';
import cloudinary from 'cloudinary-core';
import bcrypt from 'bcrypt-nodejs';

import User from '../models/Users';
import Auth from '../middleware/Auth';
import helper from '../helper/helper';


const cl = new cloudinary.Cloudinary({ cloud_name: 'dq3xmgag2', secure: true });

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
  //   /**
  //  * @description: update profile picture through the route
  //  *
  //  * @param {Object} req request object
  //  * @param {Object} res response object
  //  *
  //  * @return {Object} response containing the updated todo
  //  */
  // uploadProfilePicture(req, res) {
  //   cloudinary.config({
  //     cloud_name: process.env.CLOUD_NAME,
  //     api_key: process.env.API_KEY,
  //     api_secret: process.env.API_SECRET
  //   });
  //   if (!req.files) {
  //     return apiResponse(res, 400, 'No image found', false);
  //   }
  //   const uploadDir = 'server/uploads';
  //   if (!fs.existsSync(uploadDir)) {
  //     fs.mkdirSync(uploadDir);
  //   }

  //   const { file } = req.files;
  //   file.mv(`${uploadDir}/${file.name}`).then(() => {
  //     cloudinary.v2.uploader.upload(`${uploadDir}/${file.name}`)
  //       .then((cloudinaryImage) => {
  //         const { url } = cloudinaryImage;
  //         user.findOne(
  //           { _id: req.currentUser.currentUser._id },
  //           (err, currentUser) => {
  //             if (err) {
  //               return apiResponse(res, 500, 'Internal server error', false);
  //             }
  //             currentUser.imageUrl = url;
  //             currentUser.save((err, updatedUser) => {
  //               if (err) {
  //                 return apiResponse(res, 500, 'Internal server error', false);
  //               }
  //               return apiResponse(
  //                 res, 200, 'token', true,
  //                 generateToken(removePassword(updatedUser), secret)
  //               );
  //             });
  //           }
  //         );
  //       });
  //   }).catch(() => {
  //     apiResponse(
  //       res, 500,
  //       'An error occured while uploading image', false
  //     );
  //   });
  // }
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
    User.find({}).select(['username', 'email', 'name']).exec((err, allUsers) => {
      if (allUsers.length === 0) {
        return res.status(404).json({
          success: false,
          message: 'No user found'
        });
      } else if (allUsers.length > 0) {
        return res.status(200).json({
          success: true,
          allUsers
        });
      }
      return res.status(500).json({
        success: true,
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
        const { EMAIL, PASSWORD } = process.env;
        const token = Auth.generateToken(user);
        const transporter = nodemailer.createTransport({
          service: 'gmail',
          secure: false,
          auth: {
            user: EMAIL,
            pass: PASSWORD
          },
          tls: {
          }
        });
        const mailOptions = {
          from: EMAIL,
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
              success: false,
              message: 'Failure delivery'
            });
          }
          return res.status(200).json({
            success: true,
            message: 'Please check your mail for the reset link!'
          });
        });
      } else {
        return res.status(404).json({
          success: false,
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
            success: false,
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
                success: true,
                message: 'password reset successful, Please login to continue!'
              });
            }
          }
        );
      });
    } else {
      return res.status(400).json({
        success: false,
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
    const {
      username, email, password, name
    } = req.body;
    User.findOne({
      email
    }).exec((err, user) => {
      if (user) {
        return res.status(200).json({
          success: true,
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
          success: true,
          message: 'You have been loggedin successfully',
          token: Auth.generateToken(createdUser)
        });
      });
    });
  }

};

export default UserController;
