import React from 'react';
import { 
  List, 
  ListItem, 
  ListItemText, 
  ListItemSecondaryAction, 
  IconButton, 
  Checkbox,
  Typography,
  Box
} from '@mui/material';
import { Delete as DeleteIcon, Edit as EditIcon } from '@mui/icons-material';

const TaskListItems = ({ 
  tasks, 
  onToggleComplete, 
  onEdit, 
  onDeleteClick,
  loading = false
}) => {
  if (loading) {
    return (
      <Box p={2}>
        <Typography>Carregando tarefas...</Typography>
      </Box>
    );
  }

  if (!tasks || tasks.length === 0) {
    return (
      <Box p={2}>
        <Typography>Nenhuma tarefa encontrada.</Typography>
      </Box>
    );
  }

  return (
    <List>
      {tasks.map((task) => (
        <ListItem 
          key={task.id}
          divider
          sx={{
            backgroundColor: task.concluida ? 'action.hover' : 'background.paper',
            textDecoration: task.concluida ? 'line-through' : 'none',
            opacity: task.concluida ? 0.7 : 1,
            '&:hover': {
              backgroundColor: 'action.hover',
            },
          }}
        >
          <Checkbox
            checked={!!task.concluida}
            onChange={() => onToggleComplete(task.id, !task.concluida)}
            color="primary"
            disabled={!task.id}
          />
          <ListItemText 
            primary={task.nome} 
            secondary={
              <>
                {task.descricao && (
                  <Typography component="span" variant="body2" color="text.secondary">
                    {task.descricao}
                  </Typography>
                )}
                {task.categoria && (
                  <Typography component="span" variant="caption" display="block" color="text.secondary">
                    Categoria: {task.categoria.nome}
                  </Typography>
                )}
              </>
            }
            sx={{ 
              '& .MuiListItemText-primary': {
                textDecoration: task.concluida ? 'line-through' : 'none',
                fontWeight: 500,
              },
              '& .MuiListItemText-secondary': {
                textDecoration: 'none',
              }
            }}
          />
          <ListItemSecondaryAction>
            <IconButton 
              edge="end" 
              aria-label="editar"
              onClick={() => onEdit(task)}
              disabled={task.concluida}
              size="large"
            >
              <EditIcon />
            </IconButton>
            <IconButton 
              edge="end" 
              aria-label="deletar"
              onClick={() => onDeleteClick(task)}
              size="large"
              sx={{ color: 'error.main' }}
            >
              <DeleteIcon />
            </IconButton>
          </ListItemSecondaryAction>
        </ListItem>
      ))}
    </List>
  );
};

export default TaskListItems;