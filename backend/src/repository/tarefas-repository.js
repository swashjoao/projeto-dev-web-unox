export const repository = [
    { 
        id: 0, 
        nome: 'trabalho de casa', 
        categoriaId: 1, 
        categoria: 'SEM CATEGORIA',
        concluida: false,
        dataCriacao: new Date().toISOString()
    },
    { 
        id: 1, 
        nome: 'user', 
        categoriaId: 1, 
        categoria: 'SEM CATEGORIA',
        concluida: false,
        dataCriacao: new Date().toISOString()
    }
];

export let proximoID = 2;

export const salvar = (tarefa) => {
    repository.push(tarefa);
    return tarefa;
};

export const listarTodas = () => {
    return [...repository];
};

export const buscarPorId = (id) => {
    return repository.find(t => t.id === id);
};

export const atualizar = (tarefaAtualizada) => {
    const index = repository.findIndex(t => t.id === tarefaAtualizada.id);
    if (index !== -1) {
        repository[index] = { ...repository[index], ...tarefaAtualizada };
        return repository[index];
    }
    return null;
};

export const remover = (id) => {
    const index = repository.findIndex(t => t.id === id);
    if (index !== -1) {
        repository.splice(index, 1);
        return true;
    }
    return false;
};