import express from 'express';
import tarefasRoutes from './tarefas-routes.js';
import categoriaRoutes from './categoria-routes.js';

const router = express.Router();

router.use('/', tarefasRoutes);
router.use('/', categoriaRoutes);

export default router;
