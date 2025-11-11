import express from 'express';
import * as categoriaController from '../controller/categoria-controller.js';

const router = express.Router();

router.post('/categorias', categoriaController.CreateCategoria);
router.get('/categorias', categoriaController.getAll);
router.get('/categorias/:id', categoriaController.getById);
router.patch('/categorias/:id', categoriaController.update);
router.put('/categorias/:id', categoriaController.updateFull);
router.delete('/categorias/:id', categoriaController.deleteCategoria);

export default router;
