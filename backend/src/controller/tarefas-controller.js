import * as tarefasService from "../service/tarefas-service.js";

let proximoID = 2;

export const CreateTarefas = (req, res) => {
    const { nome, categoriaId } = req.body;
    
    if(!nome) {
        return res.status(400).json({message: 'Nome é obrigatório'});
    }
    
    const tarefa = tarefasService.createTarefas(nome, categoriaId);
    
    if(tarefa.error) {
        return res.status(400).json({message: tarefa.error});
    }
    
    res.status(201).json(tarefa);
};

export const getAll = (req, res) => {
    const tarefas = tarefasService.getAll();
    res.json(tarefas);
};

export const getById = (req, res) => {
    const { id } = req.params;
    const tarefa = tarefasService.getById(parseInt(id));
    
    if (!tarefa) {
        return res.status(404).json({ message: 'Tarefa não encontrada' });
    }
    
    res.json(tarefa);
};

export const update = (req, res) => {
    const { id } = req.params;
    const { nome, concluida, categoriaId } = req.body;
    
    const tarefaAtualizada = tarefasService.update(parseInt(id), { nome, concluida, categoriaId });
    
    if (tarefaAtualizada.error) {
        return res.status(400).json({ message: tarefaAtualizada.error });
    }
    
    if (!tarefaAtualizada) {
        return res.status(404).json({ message: 'Tarefa não encontrada' });
    }
    
    res.json(tarefaAtualizada);
};

export const updateFull = (req, res) => {
    const { id } = req.params;
    const { nome, concluida, categoriaId } = req.body;
    
    if (!nome) {
        return res.status(400).json({ message: 'Nome é obrigatório' });
    }
    
    const tarefaAtualizada = tarefasService.updateFull(parseInt(id), { 
        nome, 
        concluida: concluida || false, 
        categoriaId 
    });
    
    if (tarefaAtualizada.error) {
        return res.status(400).json({ message: tarefaAtualizada.error });
    }
    
    res.json(tarefaAtualizada);
};

export const deleteTarefa = (req, res) => {
    const { id } = req.params;
    const sucesso = tarefasService.deleteTarefa(parseInt(id));
    
    if (!sucesso) {
        return res.status(404).json({ message: 'Tarefa não encontrada' });
    }
    
    res.status(204).send();
};