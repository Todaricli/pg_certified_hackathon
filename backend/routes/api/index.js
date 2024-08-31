import { Router } from 'express';
import petRoutes from './petRoutes.js'; 

const apiRouter = Router();

apiRouter.use('/pets', petRoutes);

export default apiRouter;
