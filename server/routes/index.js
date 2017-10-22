import UsersRoutes from './UserRoutes';
import GroupRoutes from './TodosRoutes';


// setup routes using router
const Routes = (router) => {
  UsersRoutes(router);
  // TodosRoutes(router);
};

export default Routes;
