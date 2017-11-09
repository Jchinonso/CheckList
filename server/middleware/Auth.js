import jwt from 'jsonwebtoken';

require('dotenv').config();

const secret = process.env.JWT_SECRET_TOKEN;

const Auth = {

  /**
   * @description verify authentication token
   *
   * @param {Object} request object
   * @param {Object} response object
   * @param {Object} next object
   *
   * @returns {Object} message based on the response object
   */
  verifyToken(request, response, next) {
    const token = request.body.token ||
      request.headers.authorization ||
      request.headers['x-access-token'];
    if (token) {
      jwt.verify(token, secret, (error, decoded) => {
        if (error) {
          return response.status(401).send({
            message: 'Your current session as expired'
          });
        } else {
          request.decoded = decoded;
          next();
        }
      });
    } else {
      return response.status(401).send({
        message: 'You are not authorized kindly login or sign up'
      });
    }
  },
  /**
   * @description generateToken generates token for authentication
   *
   * @member Auth
   *
   * @param {Object} user object
   * @returns {Object} jwt
   *
   */
  generateToken(user) {
    return jwt.sign({
      username: user.username,
      userId: user._id,
      email: user.email,
    }, secret, { expiresIn: 60 * 60 * 24 });
  },
  /**
   * validate signup input field
   *
   * @param {Object} req object
   * @param {Object} res object
   * @param {Object} next object
   *
   * @returns {Object} validation error
   */
  validateSignupInputField(req, res, next) {
    const { email, password, username, name } = req.body;
    if (email === undefined) {
      return res.status(400).json({
        success: false,
        message: 'email is required'
      });
    } else if (password === undefined) {
      return res.status(400).json({
        success: false,
        message: 'password is required'
      });
    } else if (name === undefined) {
      return res.status(400).json({
        success: false,
        message: 'name is required'
      });
    } else if (username === undefined) {
      return res.status(400).json({
        success: false,
        message: 'username is required'
      });
    }
    next();
  },
  /**
   * validate signin input field
   *
   * @param {Object} req object
   * @param {Object} res object
   * @param {Object} next object
   *
   * @returns {Object} validation error
   */
  validateSigninInputField(req, res, next) {
    const { email, password, username, name } = req.body;
    if(email === undefined) {
      return res.status(400).json({
        success: false,
        message: 'email is required'
      });
    } else if (password === undefined) {
      return res.status(400).json({
        success: false,
        message: 'password is required'
      });
    }
    next();
  }
};
export default Auth;
