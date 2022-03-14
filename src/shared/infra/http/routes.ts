import { Router } from 'express';

import categoryRoutes from '@/modules/category/infra/http/routes/category.routes';

const routes = Router();

routes.use('/category', categoryRoutes);

export default routes;
