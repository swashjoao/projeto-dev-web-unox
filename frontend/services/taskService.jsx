import axios from 'axios';

const API_URL = 'http://localhost:3001/api';

const taskService = {
    // Buscar todas as tarefas
    async getAll() {
        try {
            const response = await axios.get(`${API_URL}/tarefas`);
            return response.data;
        } catch (error) {
            console.error('Erro ao buscar tarefas:', error);
            throw error;
        }
    },

    // Buscar tarefa por ID
    async getById(id) {
        try {
            const response = await axios.get(`${API_URL}/tarefas/${id}`);
            return response.data;
        } catch (error) {
            console.error(`Erro ao buscar tarefa ${id}:`, error);
            throw error;
        }
    },

    // Criar nova tarefa
    async create(taskData) {
        try {
            const response = await axios.post(`${API_URL}/tarefas`, taskData);
            return response.data;
        } catch (error) {
            console.error('Erro ao criar tarefa:', error);
            throw error;
        }
    },

    // Atualizar tarefa
    async update(id, taskData) {
        try {
            const response = await axios.put(`${API_URL}/tarefas/${id}`, taskData);
            return response.data;
        } catch (error) {
            console.error(`Erro ao atualizar tarefa ${id}:`, error);
            throw error;
        }
    },

    // Deletar tarefa
    async delete(id) {
        try {
            await axios.delete(`${API_URL}/tarefas/${id}`);
            return id; // Retorna o ID da tarefa excluída
        } catch (error) {
            console.error(`Erro ao excluir tarefa ${id}:`, error);
            throw error;
        }
    },

    // Atualizar status de conclusão
    async toggleComplete(id, completed) {
        try {
            const response = await axios.patch(`${API_URL}/tarefas/${id}`, {
                concluida: completed
            });
            return response.data;
        } catch (error) {
            console.error(`Erro ao atualizar status da tarefa ${id}:`, error);
            throw error;
        }
    }
};

export default taskService;