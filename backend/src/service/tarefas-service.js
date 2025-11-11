let tarefas = [
    { id: 1, nome: 'Tarefa de exemplo', categoriaId: 1, concluida: false }
];

export const createTarefas = (nome, categoriaId) => {
    if (!nome) {
        return { error: 'Nome é obrigatório' };
    }
    
    const novaTarefa = {
        id: Date.now(),
        nome,
        categoriaId: parseInt(categoriaId),
        concluida: false
    };
    
    tarefas.push(novaTarefa);
    return novaTarefa;
};

export const getTarefaById = (id) => {
    return tarefas.find(tarefa => tarefa.id === parseInt(id));
};

export const updateTarefa = (id, dadosAtualizados) => {
    const index = tarefas.findIndex(t => t.id === parseInt(id));
    
    if (index === -1) {
        return { error: 'Tarefa não encontrada' };
    }
    
    tarefas[index] = { ...tarefas[index], ...dadosAtualizados };
    return tarefas[index];
};

export const deleteTarefa = (id) => {
    const index = tarefas.findIndex(t => t.id === parseInt(id));
    
    if (index === -1) {
        return { error: 'Tarefa não encontrada' };
    }
    
    const [tarefaRemovida] = tarefas.splice(index, 1);
    return tarefaRemovida;
};

export const getAllTarefas = () => {
    return [...tarefas];
};