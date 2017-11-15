
const errorHandler = {
  /**
   * validate Database errors
   *
   * @param {Object} req object
   * @param {Object} res object
   *
   * @returns {Object} validation error
   */

  validateUserError(err, res) {
    if (err.errors !== null) {
      if (err.errors.name) {
        res.status(400).json({ message: err.errors.name.message });
      } else if (err.errors.email) {
        res.status(400).json({ message: err.errors.email.message });
      } else if (err.errors.username) {
        res.status(400).json({ message: err.errors.username.message });
      } else if (err.errors.password) {
        res.status(400).json({ message: err.errors.password.message });
      } else {
        res.json({ message: err });
      }
    }
  },

};

export default errorHandler;
