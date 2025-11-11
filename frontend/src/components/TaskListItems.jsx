import React from 'react';
import { List, ListItem, ListItemText, ListItemSecondaryAction, IconButton, Checkbox } from '@mui/material';
import { Delete as DeleteIcon, Edit as EditIcon } from '@mui/icons-material';

const TaskListItems = ({
  tasks,
  onToggleComplete,
  onEdit,
  onDelete,
  selectedTask,
  setSelectedTask
}) => {
  return (
    <List>
      {tasks.map((task) => (
        <ListItem
          key={task.id}
          divider
          sx={{
            backgroundColor: task.completed ? 'action.hover' : 'background.paper',
            textDecoration: task.completed ? 'line-through' : 'none',
            opacity: task.completed ? 0.7 : 1,
          }}
        >
          <Checkbox
            checked={task.completed}
            onChange={() => onToggleComplete(task.id, !task.completed)}
            color="primary"
          />
          <ListItemText
            primary={task.nome}
            secondary={task.descricao || 'Sem descrição'}
            sx={{
              textDecoration: task.completed ? 'line-through' : 'none',
              '& .MuiListItemText-secondary': {
                textDecoration: task.completed ? 'line-through' : 'none',
              }
            }}
          />
          <ListItemSecondaryAction>
            <IconButton
              edge="end"
              aria-label="editar"
              onClick={() => onEdit(task)}
              disabled={task.completed}
            >
              <EditIcon />
            </IconButton>
            <IconButton
              edge="end"
              aria-label="deletar"
              onClick={() => setSelectedTask(task)}
            >
              <DeleteIcon color="error" />
            </IconButton>
          </ListItemSecondaryAction>
        </ListItem>
      ))}
    </List>
  );
};

export default TaskListItems;
