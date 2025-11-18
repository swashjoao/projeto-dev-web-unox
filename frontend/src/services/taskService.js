// src/services/taskService.js
const TASKS_STORAGE_KEY = 'tarefas';

function loadTasks() {
    try {
        const stored = localStorage.getItem(TASKS_STORAGE_KEY);
        return stored ? JSON.parse(stored) : [];
    } catch (error) {
        console.error('Erro ao ler tarefas do localStorage:', error);
        return [];
    }
}

function saveTasks(tasks) {
    try {
        localStorage.setItem(TASKS_STORAGE_KEY, JSON.stringify(tasks));
    } catch (error) {
        console.error('Erro ao salvar tarefas no localStorage:', error);
    }
}

const taskService = {
    async getAll() {
        return loadTasks();
    },

    async getTaskById(id) {
        const tasks = loadTasks();
        const task = tasks.find((t) => t.id === String(id));

        if (!task) {
            throw new Error('Tarefa não encontrada');
        }

        return task;
    },

    async create(taskData) {
        const tasks = loadTasks();

        const newTask = {
            id: Date.now().toString(),
            concluida: false,
            ...taskData,
        };

        tasks.push(newTask);
        saveTasks(tasks);

        return newTask;
    },

    async update(id, taskData) {
        const tasks = loadTasks();
        const index = tasks.findIndex((t) => t.id === String(id));

        if (index === -1) {
            throw new Error('Tarefa não encontrada');
        }

        const updated = {
            ...tasks[index],
            ...taskData,
        };

        tasks[index] = updated;
        saveTasks(tasks);

        return updated;
    },

    async toggleComplete(id, completed) {
        return this.update(id, { concluida: completed });
    },

    async deleteTask(id) {
        const tasks = loadTasks();
        const filtered = tasks.filter((t) => t.id !== String(id));

        saveTasks(filtered);

        return id;
    },
};

export default taskService;
