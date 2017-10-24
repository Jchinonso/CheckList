
const helper = {

  validateUserError(err, res) {
    if (err.errors !== null ) {
        if (err.errors.name) {
            res.json({ success: false, message: err.errors.name.message });
        } else if (err.errors.email) {
            res.json({ success: false, message: err.errors.email.message });
        } else if (err.errors.username) {
            res.json({ success: false, message: err.errors.username.message });
        } else if (err.errors.password) {
            res.json({ success: false, message: err.errors.password.message });
        } else {
            res.json({ success: false, message: err });
        }
    }
  },

  validateTodoError(err, res) {
    if(err.errors !== null) {
      if (err.errors.text) {
        res.json({ success: false, message: err.errors.text.message });
      }
    }
  }


};

export default helper;
