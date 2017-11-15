import UsersController from '../controllers/UserController';
import Auth from '../middleware/Auth';

const UserRoutes = (router) => {
  router.route('/users')
    .get(UsersController.retrieveAllUsers);
  router.route('/user/signup')
    .post(Auth.validateSignupInputField, UsersController.signUp);
  router.route('/user')
    .put(Auth.verifyToken, UsersController.updateProfile);
  router.route('/user/updateProfile')
    .put(Auth.verifyToken, UsersController.uploadProfilePicture);
  router.route('/user/signin')
    .post(Auth.validateSigninInputField, UsersController.signIn);
  router.route('/user/forgotPassword')
    .post(UsersController.forgotPassword);
  router.route('/user/resetPassword')
    .post(UsersController.resetPassword);
  router.route('/user/googleLogin')
    .post(UsersController.googleSignIn);
};

export default UserRoutes;
