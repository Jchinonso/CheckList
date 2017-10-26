import jwt from 'jsonwebtoken';


const secret = process.env.JWT_SECRET_TOKEN || 'keepmysecret'

const Auth = {

  /**
   * verify authentication token
   * @param {Object} user object
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
   * generateToken generates token for authentication
   * @param {Object} user object
   * @returns {Object} jwt
   */
  generateToken(user) {
    return jwt.sign({
      username: user.username,
      userId: user._id,
      email: user.email,
    }, secret, { expiresIn: 60 * 60 * 24 });
  },

  validateSignupInputField(req, res, next) {
    const { email, password, username, name } = req.body;
    if(email === undefined) {
      return res.status(400).json({message: 'email is required'})
    } else if (password === undefined) {
      return res.status(400).json({
        message: 'password is required'
      })
    } else if (name === undefined) {
      return res.status(400).json({
        message: 'name is required'
      })
    } else if (username === undefined) {
      return res.status(400).json({
        message: 'username is required'
     })
    }
    next();
  },
  validateSigninInputField(req, res, next) {
    const { email, password, username, name } = req.body;
    if(email === undefined) {
      return res.status(400).json({message: 'email is required'})
    } else if (password === undefined) {
      return res.status(400).json({
        message: 'password is required'
      })
    }
    next();
  }
};
export default Auth;
