import * as categoriaService from "../service/categoria-service.js";

export const CreateCategoria = (req, res) => {
    const { nome, descricao } = req.body;
    
    if (!nome) {
        return res.status(400).json({ message: 'Nome é obrigatório' });
    }
    
    const categoria = categoriaService.createCategoria(nome, descricao);
    
    if (categoria.error) {
        return res.status(400).json({ message: categoria.error });
    }
    
    res.status(201).json(categoria);
};

export const getAll = (req, res) => {
    const categorias = categoriaService.getAll();
    res.json(categorias);
};

export const getById = (req, res) => {
    const { id } = req.params;
    const categoria = categoriaService.getById(parseInt(id));
    
    if (!categoria) {
        return res.status(404).json({ message: 'Categoria não encontrada' });
    }
    
    res.json(categoria);
};

export const update = (req, res) => {
    const { id } = req.params;
    const { nome, descricao } = req.body;
    
    const categoriaAtualizada = categoriaService.update(parseInt(id), { nome, descricao });
    
    if (categoriaAtualizada.error) {
        return res.status(400).json({ message: categoriaAtualizada.error });
    }
    
    if (!categoriaAtualizada) {
        return res.status(404).json({ message: 'Categoria não encontrada' });
    }
    
    res.json(categoriaAtualizada);
};

export const updateFull = (req, res) => {
    const { id } = req.params;
    const { nome, descricao } = req.body;
    
    if (!nome) {
        return res.status(400).json({ message: 'Nome é obrigatório' });
    }
    
    const categoriaAtualizada = categoriaService.updateFull(parseInt(id), { 
        nome, 
        descricao: descricao || '' 
    });
    
    if (categoriaAtualizada.error) {
        return res.status(400).json({ message: categoriaAtualizada.error });
    }
    
    res.json(categoriaAtualizada);
};

export const deleteCategoria = (req, res) => {
    const { id } = req.params;
    const sucesso = categoriaService.deleteCategoria(parseInt(id));
    
    if (!sucesso) {
        return res.status(404).json({ message: 'Categoria não encontrada' });
    }
    
    res.status(204).send();
};
