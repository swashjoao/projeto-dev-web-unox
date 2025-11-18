// src/pages/tasks/NewTaskPage.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {
    Box,
    Container,
    Typography,
    CircularProgress,
    Alert,
} from '@mui/material';
import taskService from '../../services/taskService';
import TaskForm from './TaskForm';
import api from '../../services/api';

const NewTaskPage = ({ editMode = false, tasks = [], setTasks }) => {
    const navigate = useNavigate();
    const { id } = useParams(); // vem como string
    const [loading, setLoading] = useState(false);
    const [task, setTask] = useState(null);
    const [categories, setCategories] = useState([]);
    const [error, setError] = useState(null);
    const [openForm, setOpenForm] = useState(true);

    // Buscar categorias e dados da tarefa (se for edição)
    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);

                const categoriesResponse = await api.get('categorias');
                setCategories(categoriesResponse.data || []);

                if (editMode && id) {
                    const taskData = await taskService.getTaskById(id);
                    setTask(taskData);
                }

                setError(null);
            } catch (err) {
                console.error('Erro ao carregar dados:', err);
                setError(
                    'Erro ao carregar os dados. Por favor, tente novamente.'
                );
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [editMode, id]);

    const handleSubmit = async (formData) => {
        try {
            setLoading(true);

            const dataToSend = {
                ...formData,
                dataVencimento: formData.dataVencimento
                    ? new Date(formData.dataVencimento).toISOString()
                    : null,
            };

            if (editMode && id) {
                // EDITAR
                const updatedTask = await taskService.update(id, dataToSend);

                // Atualiza o estado global
                if (setTasks) {
                    setTasks((prev) =>
                        prev.map((t) =>
                            t.id === updatedTask.id ? updatedTask : t
                        )
                    );
                }
            } else {
                // CRIAR
                const newTask = await taskService.create(dataToSend);

                if (setTasks) {
                    setTasks((prev) => [...prev, newTask]);
                }
            }

            navigate('/tasks');
        } catch (error) {
            console.error(
                `Erro ao ${editMode ? 'atualizar' : 'criar'} tarefa:`,
                error
            );
            setError(
                `Erro ao ${
                    editMode ? 'atualizar' : 'criar'
                } tarefa. Por favor, tente novamente.`
            );
        } finally {
            setLoading(false);
        }
    };

    const handleClose = () => {
        navigate('/tasks');
    };

    return (
        <Container maxWidth="md">
            <Box sx={{ my: 4 }}>
                <Box
                    sx={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        mb: 3,
                    }}
                >
                    <Typography variant="h4" component="h1">
                        {editMode ? 'Editar Tarefa' : 'Nova Tarefa'}
                    </Typography>
                </Box>

                {error && (
                    <Alert severity="error" sx={{ mb: 2 }}>
                        {error}
                    </Alert>
                )}

                {loading && !categories.length ? (
                    <Box display="flex" justifyContent="center" my={4}>
                        <CircularProgress />
                    </Box>
                ) : (
                    <TaskForm
                        open={openForm}
                        handleClose={handleClose}
                        handleSubmit={handleSubmit}
                        loading={loading}
                        categorias={categories}
                        initialData={task}
                        isEditing={editMode}
                    />
                )}
            </Box>
        </Container>
    );
};

export default NewTaskPage;
