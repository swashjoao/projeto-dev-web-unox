let repository = [
    {
        id: 1,
        nome: "Sem Categoria",
        descricao: "Categoria padrão para itens sem classificação"
    }
];
let proximoID = 2;

export const salvar = (categoria) => {
    repository.push(categoria);
    return categoria;
};

export const getAll = () => {
    return [...repository];
};

export const getById = (id) => {
    return repository.find(c => c.id === id);
};

export const getByNome = (nome) => {
    return repository.find(c => c.nome.toLowerCase() === nome.toLowerCase());
};

export const atualizar = (categoriaAtualizada) => {
    const index = repository.findIndex(c => c.id === categoriaAtualizada.id);
    if (index !== -1) {
        repository[index] = { ...repository[index], ...categoriaAtualizada };
        return repository[index];
    }
    return null;
};

export const remover = (id) => {
    // Não permite remover a categoria padrão
    if (id === 1) {
        return { error: "Não é possível remover a categoria padrão" };
    }
    
    const index = repository.findIndex(c => c.id === id);
    if (index !== -1) {
        repository.splice(index, 1);
        return true;
    }
    return false;
};

export const getProximoID = () => {
    return proximoID++;
};

export const getCategoriaDefault = () => getById(1);

