import { Router } from 'express';
import * as categoryController from '../controllers/categoryController';

const categoryRoutes = Router();

categoryRoutes.post('/', categoryController.createCategory);

export default categoryRoutes;
