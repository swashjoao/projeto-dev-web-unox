import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    Box,
    Button,
    Container,
    Typography,
    CircularProgress,
    Paper,
    TextField,
    FormControl,
    Select,
    MenuItem,
    useTheme,
} from '@mui/material';
import {
    Add as AddIcon,
    FilterList as FilterListIcon,
    Search as SearchIcon,
} from '@mui/icons-material';
import TaskListItems from './components/TaskListItems';
import DeleteTaskDialog from './components/DeleteTaskDialog.jsx';
import taskService from '../../services/taskService';

const TaskList = ({ tasks, setTasks, onTaskUpdated }) => {
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [filterStatus, setFilterStatus] = useState('all');
    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
    const [taskToDelete, setTaskToDelete] = useState(null);
    const [error, setError] = useState(null);
    const theme = useTheme();
    const navigate = useNavigate();

    // Carrega as tarefas do localStorage na montagem
    useEffect(() => {
        const fetchTasks = async () => {
            try {
                setLoading(true);
                const data = await taskService.getAll();
                setTasks(data);
            } catch (error) {
                console.error('Erro ao carregar tarefas:', error);
                setError('Erro ao carregar tarefas. Tente novamente.');
            } finally {
                setLoading(false);
            }
        };

        fetchTasks();
    }, [setTasks]);

    // Aplica filtro em cima de tasks do pai
    const filteredTasks = (tasks || []).filter((task) => {
        const term = searchTerm.toLowerCase();

        const matchesSearch =
            task.titulo?.toLowerCase().includes(term) ||
            task.descricao?.toLowerCase().includes(term);

        const matchesStatus =
            filterStatus === 'all' ||
            (filterStatus === 'completed' && task.concluida) ||
            (filterStatus === 'pending' && !task.concluida);

        return matchesSearch && matchesStatus;
    });

    const handleAddTask = () => {
        navigate('/tasks/new');
    };

    const handleDeleteClick = (task) => {
        setTaskToDelete(task);
        setDeleteDialogOpen(true);
    };

    const handleDeleteConfirm = async () => {
        if (!taskToDelete) return;

        try {
            await taskService.deleteTask(taskToDelete.id);

            // Atualiza estado do pai
            setTasks((prevTasks) =>
                prevTasks.filter((task) => task.id !== taskToDelete.id),
            );

            setDeleteDialogOpen(false);
            setTaskToDelete(null);
        } catch (error) {
            console.error('Erro ao excluir tarefa:', error);
        }
    };

    const handleEditTask = (taskId) => {
        navigate(`/tasks/edit/${taskId}`);
    };

    const handleToggleComplete = async (taskId, completed) => {
        try {
            await taskService.toggleComplete(taskId, completed);

            setTasks((prevTasks) =>
                prevTasks.map((task) =>
                    task.id === taskId ? { ...task, concluida: completed } : task,
                ),
            );
        } catch (error) {
            console.error('Erro ao atualizar status da tarefa:', error);
        }
    };

    if (loading && (!tasks || tasks.length === 0)) {
        return (
            <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
                <CircularProgress />
            </Box>
        );
    }

    return (
        <Container maxWidth="lg">
            <Box sx={{ mb: 4 }}>
                <Box
                    sx={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        mb: 3,
                    }}
                >
                    <Typography variant="h4" component="h1">
                        Minhas Tarefas
                    </Typography>
                    <Button
                        variant="contained"
                        color="primary"
                        startIcon={<AddIcon />}
                        onClick={handleAddTask}
                    >
                        Nova Tarefa
                    </Button>
                </Box>

                <Paper
                    sx={{
                        p: 2,
                        mb: 3,
                        display: 'flex',
                        alignItems: 'center',
                        gap: 2,
                    }}
                >
                    <Box sx={{ flexGrow: 1, maxWidth: 400 }}>
                        <TextField
                            fullWidth
                            variant="outlined"
                            placeholder="Buscar tarefas..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            InputProps={{
                                startAdornment: (
                                    <SearchIcon sx={{ color: 'action.active', mr: 1 }} />
                                ),
                            }}
                        />
                    </Box>
                    <Box sx={{ minWidth: 200 }}>
                        <FormControl fullWidth variant="outlined" size="small">
                            <Select
                                value={filterStatus}
                                onChange={(e) => setFilterStatus(e.target.value)}
                                startAdornment={
                                    <FilterListIcon
                                        sx={{ color: 'action.active', mr: 1 }}
                                    />
                                }
                            >
                                <MenuItem value="all">Todas as tarefas</MenuItem>
                                <MenuItem value="pending">Pendentes</MenuItem>
                                <MenuItem value="completed">Concluídas</MenuItem>
                            </Select>
                        </FormControl>
                    </Box>
                </Paper>

                <TaskListItems
                    tasks={filteredTasks}
                    onToggleComplete={handleToggleComplete}
                    onEdit={handleEditTask}
                    onDeleteClick={handleDeleteClick}
                />

                <DeleteTaskDialog
                    open={deleteDialogOpen}
                    onClose={() => setDeleteDialogOpen(false)}
                    onConfirm={handleDeleteConfirm}
                    taskTitle={taskToDelete?.titulo || ''}
                />
            </Box>
        </Container>
    );
};

export default TaskList;