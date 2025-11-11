import express from 'express';
import * as tarefasController from '../controller/tarefas-controller.js';

const router = express.Router();

router.post('/tarefas', tarefasController.CreateTarefas);
router.get('/tarefas', tarefasController.getAll);
router.get('/tarefas/:id', tarefasController.getById);
router.patch('/tarefas/:id', tarefasController.update);
router.put('/tarefas/:id', tarefasController.updateFull);
router.delete('/tarefas/:id', tarefasController.deleteTarefa);

export default router;