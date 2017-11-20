import nodemailer from 'nodemailer';
import Auth from '../middleware/Auth';


/** Send mail
   * @desc send email so user can reset password
   *
   * @function sendMail
   *
   * @param {object} user object
   * @param {Object} req Request Object
   * @param {Object} res Response Object
   *
   * @returns {object} Returns a success message
   */

const sendMail = (user, req, res) => {
  const { email } = req.body;
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
    to: email,
    subject: 'Reset Password',
    html: `<p>You have received this mail because you asked to reset
    your account on WorkList. Please
    <a href="http://${process.env.SITE_URL}/reset-password?secret=${token}">
    Click here</a> to begin the process</p><br />
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
};

export default sendMail;
