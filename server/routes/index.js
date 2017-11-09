import usersRoutes from './userRoutes';
import todosRoutes from './todosRoutes';


// setup routes using router
const Routes = (router) => {
  usersRoutes(router);
  todosRoutes(router);
};

export default Routes;
