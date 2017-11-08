
const helper = {

  validateUserError(err, res) {
    if (err.errors !== null) {
      if (err.errors.name) {
        res.status(400).json({ success: false, message: err.errors.name.message });
      } else if (err.errors.email) {
        res.status(400).json({ success: false, message: err.errors.email.message });
      } else if (err.errors.username) {
        res.status(400).json({ success: false, message: err.errors.username.message });
      } else if (err.errors.password) {
        res.status(400).json({ success: false, message: err.errors.password.message });
      } else {
        res.json({ success: false, message: err });
      }
    }
  },

};

export default helper;
