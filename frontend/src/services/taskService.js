import api from './api';

const taskService = {
    async getAll() {
        const response = await api.get('/tarefas');
        return response.data;
    },

    async getById(id) {
        const response = await api.get(`/tarefas/${id}`);
        return response.data;
    },

    async create(taskData) {
        const response = await api.post('/tarefas', taskData);
        return response.data;
    },

    async update(id, taskData) {
        const response = await api.put(`/tarefas/${id}`, taskData);
        return response.data;
    },

    async delete(id) {
        await api.delete(`/tarefas/${id}`);
        return id;
    },

    async toggleComplete(id, completed) {
        const response = await api.patch(`/tarefas/${id}`, {
            concluida: completed
        });
        return response.data;
    }
};

export default taskService;