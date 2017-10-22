import UsersController from '../controllers/UserController';
import Auth from '../middleware/Auth';

const UserRoutes = (router) => {

  router.route('/user/signup')
    .post(Auth.validateInputField, UsersController.signUp);
  router.route('/user/signin')
    .post(Auth.validateInputField, UsersController.signIn);
};

export default UserRoutes;
