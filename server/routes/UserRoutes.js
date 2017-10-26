import UsersController from '../controllers/UserController';
import Auth from '../middleware/Auth';

const UserRoutes = (router) => {

  router.route('/user/signup')
    .post(Auth.validateSignupInputField, UsersController.signUp);
  router.route('/user/signin')
    .post(Auth.validateSigninInputField, UsersController.signIn);
};

export default UserRoutes;
