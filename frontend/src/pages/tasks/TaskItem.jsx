import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    Card,
    Box,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    IconButton,
    Tooltip,
    Typography,
    Checkbox,
} from '@mui/material';
import {
    Edit as EditIcon,
    Delete as DeleteIcon,
} from '@mui/icons-material';
import { format, parseISO } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import taskService from '../../../services/taskService';

const TaskItem = ({ task, onDeleteClick }) => {
    const navigate = useNavigate();
    const [completed, setCompleted] = useState(task.concluida);

    const handleToggleComplete = async () => {
        try {
            const updatedTask = await taskService.updateTask(task.id, {
                ...task,
                concluida: !completed
            });
            setCompleted(updatedTask.concluida);
        } catch (error) {
            console.error('Erro ao atualizar status da tarefa:', error);
        }
    };

    const handleEditClick = (e) => {
        e.stopPropagation();
        navigate(`/tasks/${task.id}`);
    };

    const handleDelete = (e) => {
        e.stopPropagation();
        onDeleteClick(task);
    };

    const formatDate = (dateString) => {
        if (!dateString) return 'Sem data';
        return format(parseISO(dateString), "dd/MM/yyyy 'às' HH:mm", { locale: ptBR });
    };

    return (
        <Card
            variant="outlined"
            sx={{
                mb: 2,
                borderLeft: 4,
                borderLeftColor: task.prioridade === 'alta'
                    ? 'error.main'
                    : task.prioridade === 'media'
                        ? 'warning.main'
                        : 'success.main',
                opacity: completed ? 0.8 : 1,
            }}
        >
            <Box sx={{ display: 'flex', alignItems: 'flex-start' }}>
                <ListItemButton
                    onClick={handleToggleComplete}
                    sx={{ flexGrow: 1, alignItems: 'flex-start' }}
                >
                    <ListItemIcon sx={{ minWidth: 40, mt: 1 }}>
                        <Checkbox
                            edge="start"
                            checked={completed}
                            tabIndex={-1}
                            disableRipple
                        />
                    </ListItemIcon>
                    <ListItemText
                        primary={
                            <Typography
                                variant="subtitle1"
                                sx={{
                                    textDecoration: completed ? 'line-through' : 'none',
                                    color: completed ? 'text.secondary' : 'text.primary',
                                }}
                            >
                                {task.titulo}
                            </Typography>
                        }
                        secondary={
                            <>
                                <Typography
                                    component="span"
                                    variant="body2"
                                    color="text.primary"
                                    sx={{
                                        display: 'block',
                                        textDecoration: completed ? 'line-through' : 'none',
                                    }}
                                >
                                    {task.descricao || 'Sem descrição'}
                                </Typography>
                                <Typography
                                    variant="caption"
                                    color="text.secondary"
                                    sx={{ display: 'block', mt: 0.5 }}
                                >
                                    Criada em: {formatDate(task.dataCriacao)}
                                    {task.dataConclusao && ` • Concluída em: ${formatDate(task.dataConclusao)}`}
                                </Typography>
                                {task.categoria && (
                                    <Typography
                                        variant="caption"
                                        sx={{
                                            display: 'inline-block',
                                            bgcolor: 'primary.light',
                                            color: 'primary.contrastText',
                                            px: 1,
                                            borderRadius: 1,
                                            mt: 1,
                                        }}
                                    >
                                        {task.categoria.nome}
                                    </Typography>
                                )}
                            </>
                        }
                    />
                </ListItemButton>

                <Box sx={{ display: 'flex', alignItems: 'center', pr: 2, pt: 2 }}>
                    <Tooltip title="Editar">
                        <IconButton
                            onClick={handleEditClick}
                            size="small"
                            color="primary"
                            sx={{ mr: 1 }}
                        >
                            <EditIcon />
                        </IconButton>
                    </Tooltip>
                    <Tooltip title="Excluir">
                        <IconButton
                            onClick={handleDelete}
                            size="small"
                            color="error"
                        >
                            <DeleteIcon />
                        </IconButton>
                    </Tooltip>
                </Box>
            </Box>
        </Card>
    );
};

export default TaskItem;