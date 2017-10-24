import UsersRoutes from './UserRoutes';
import TodosRoutes from './TodosRoutes';


// setup routes using router
const Routes = (router) => {
  UsersRoutes(router);
  TodosRoutes(router);
};

export default Routes;
