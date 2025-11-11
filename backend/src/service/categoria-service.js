import {
    getById,
    remover,
    getCategoriaDefault,
    getByNome as repoGetByNome,
    getProximoID,
    salvar,
    atualizar,
    getAll as repoGetAll
} from "../repository/categoria-repository.js";

const createCategoria = (nome, descricao) => {
    const categoriaExistente = repoGetByNome(nome);
    if (categoriaExistente) {
        throw new Error('Já existe uma categoria com este nome');
    }

    const novaCategoria = {
        id: getProximoID(),
        nome,
        descricao
    };

    return salvar(novaCategoria);
};

const getAll = () => {
    return repoGetAll();
};

const getByNome = (nome) => {
    return repoGetByNome(nome);
};

const update = (id, { nome, descricao }) => {
    const categoriaExistente = getById(id);
    if (!categoriaExistente) {
        throw new Error('Categoria não encontrada');
    }

    // Verifica se já existe outra categoria com o mesmo nome
    if (nome && nome !== categoriaExistente.nome) {
        const categoriaComMesmoNome = getByNome(nome);
        if (categoriaComMesmoNome) {
            throw new Error('Já existe uma categoria com este nome');
        }
    }

    const categoriaAtualizada = {
        ...categoriaExistente,
        nome: nome || categoriaExistente.nome,
        descricao: descricao !== undefined ? descricao : categoriaExistente.descricao
    };

    return atualizar(categoriaAtualizada);
};

export {
    createCategoria,
    getAll,
    getById,
    getByNome,
    update,
    remover,
    getCategoriaDefault
};