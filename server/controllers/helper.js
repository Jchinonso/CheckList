
const helper = {

  validateServerError(err, res){
    if (err.errors !== null && err.name !== 'MongoError') {
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


};

export default helper;
