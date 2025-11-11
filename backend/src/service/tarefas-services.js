import * as tarefasRepository from "../repository/tarefas-repository.js";
import * as categoriaService from "./categoria-service.js";

let proximoID = 2;

const createTarefas = (nome, categoriaId) => {
    let categoria;
    
    // Se não informou categoria, usa a padrão
    if (!categoriaId) {
        categoria = categoriaService.getCategoriaDefault();
    } else {
        categoria = categoriaService.getById(categoriaId);
        if (!categoria) {
            return { error: "Categoria não encontrada" };
        }
    }
    
    const tarefa = {
        id: proximoID++, 
        nome: nome, 
        concluida: false,
        dataCriacao: new Date().toISOString(),
        categoriaId: categoria.id,
        categoria: categoria.nome
    };
    
    tarefasRepository.salvar(tarefa);
    return tarefa;
};

const getAll = () => {
    return tarefasRepository.listarTodas();
};

const getById = (id) => {
    return tarefasRepository.buscarPorId(id);
};

const update = (id, { nome, concluida, categoriaId }) => {
    const tarefa = tarefasRepository.buscarPorId(id);
    if (!tarefa) return null;
    
    if (nome !== undefined) tarefa.nome = nome;
    if (concluida !== undefined) {
        tarefa.concluida = concluida;
        if (concluida) {
            tarefa.dataConclusao = new Date().toISOString();
        } else {
            tarefa.dataConclusao = null;
        }
    }
    
    if (categoriaId !== undefined) {
        const categoria = categoriaService.getById(categoriaId);
        if (!categoria) {
            return { error: "Categoria não encontrada" };
        }
        tarefa.categoriaId = categoria.id;
        tarefa.categoria = categoria.nome;
    }
    
    tarefasRepository.atualizar(tarefa);
    return tarefa;
};

const updateFull = (id, { nome, concluida = false, categoriaId }) => {
    const tarefa = tarefasRepository.buscarPorId(id);
    if (!tarefa) return null;
    
    if (!nome) {
        return { error: "Nome é obrigatório" };
    }
    
    const categoria = categoriaService.getById(categoriaId || 1);
    if (!categoria) {
        return { error: "Categoria não encontrada" };
    }
    
    const tarefaAtualizada = {
        ...tarefa,
        nome,
        concluida,
        categoriaId: categoria.id,
        categoria: categoria.nome,
        dataAtualizacao: new Date().toISOString()
    };
    
    if (concluida && !tarefa.dataConclusao) {
        tarefaAtualizada.dataConclusao = new Date().toISOString();
    } else if (!concluida) {
        tarefaAtualizada.dataConclusao = null;
    }
    
    tarefasRepository.atualizar(tarefaAtualizada);
    return tarefaAtualizada;
};

const deleteTarefa = (id) => {
    return tarefasRepository.remover(id);
};

export {
    createTarefas,
    getAll,
    getById,
    update,
    updateFull,
    deleteTarefa as delete
};