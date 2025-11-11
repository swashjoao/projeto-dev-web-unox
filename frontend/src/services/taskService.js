import api from './api';

const TASKS_STORAGE_KEY = 'tarefas';

const taskService = {
    async getAll() {
        try {
            // Tenta buscar do localStorage
            const tasks = JSON.parse(localStorage.getItem(TASKS_STORAGE_KEY)) || [];
            return tasks;
        } catch (error) {
            console.error('Erro ao carregar tarefas do localStorage:', error);
            return [];
        }
    },

    async create(taskData) {
        try {
            const tasks = await this.getAll();
            const newTask = {
                id: Date.now().toString(), // Gera um ID único
                ...taskData,
                concluida: false // Valor padrão
            };

            tasks.push(newTask);
            localStorage.setItem(TASKS_STORAGE_KEY, JSON.stringify(tasks));
            return newTask;
        } catch (error) {
            console.error('Erro ao criar tarefa:', error);
            throw error;
        }
    },

    async update(id, taskData) {
        try {
            let tasks = await this.getAll();
            const taskIndex = tasks.findIndex(t => t.id === id);

            if (taskIndex === -1) {
                throw new Error('Tarefa não encontrada');
            }

            tasks[taskIndex] = { ...tasks[taskIndex], ...taskData };
            localStorage.setItem(TASKS_STORAGE_KEY, JSON.stringify(tasks));
            return tasks[taskIndex];
        } catch (error) {
            console.error('Erro ao atualizar tarefa:', error);
            throw error;
        }
    },

    async delete(id) {
        try {
            let tasks = await this.getAll();
            tasks = tasks.filter(t => t.id !== id);
            localStorage.setItem(TASKS_STORAGE_KEY, JSON.stringify(tasks));
            return id;
        } catch (error) {
            console.error('Erro ao deletar tarefa:', error);
            throw error;
        }
    },

    async toggleComplete(id, completed) {
        return this.update(id, { concluida: completed });
    }
};

export default taskService;