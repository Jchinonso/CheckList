import UsersRoutes from './UserRoutes';
import TodosRoutes from './TodosRoutes';


const Routes = (router) => {
  UsersRoutes(router);
  TodosRoutes(router);
};

export default Routes;
