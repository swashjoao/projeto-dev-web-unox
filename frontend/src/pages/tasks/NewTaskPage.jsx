import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Container, Typography, Button, CircularProgress, Alert } from '@mui/material';
import { Add as AddIcon } from '@mui/icons-material';
import TaskForm from './TaskForm';
import api from '../../services/api';

const NewTaskPage = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [categories, setCategories] = useState([]);
    const [error, setError] = useState(null);
    const [openForm, setOpenForm] = useState(true);

    // Fetch categories when component mounts
    useEffect(() => {
        const fetchCategories = async () => {
            try {
                setLoading(true);
                console.log('Buscando categorias...');
                const response = await api.get('categorias');
                console.log('Resposta da API (categorias):', response.data);
                setCategories(response.data || []);
                setError(null);
            } catch (err) {
                console.error('Erro ao carregar categorias:', err);
                setError('Erro ao carregar categorias. Por favor, tente novamente.');
            } finally {
                setLoading(false);
            }
        };

        fetchCategories();
    }, []);

    const handleSubmit = async (formData) => {
        try {
            setLoading(true);
            // Format the date to ISO string
            const taskData = {
                ...formData,
                dataVencimento: formData.dataVencimento ? formData.dataVencimento.toISOString() : null,
            };

            console.log('Enviando tarefa:', taskData);
            await api.post('/tarefas', taskData);
            navigate('/tasks'); // Redirect to tasks list after successful creation
        } catch (err) {
            console.error('Erro ao criar tarefa:', err);
            setError('Erro ao criar tarefa. Por favor, verifique os dados e tente novamente.');
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
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                    <Typography variant="h4" component="h1">
                        Nova Tarefa
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
                    />
                )}
            </Box>
        </Container>
    );
};

export default NewTaskPage;