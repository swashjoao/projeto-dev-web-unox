import { Card, List, Box, Typography, Button, Paper } from '@mui/material';
import { Add as AddIcon } from '@mui/icons-material';
import TaskItem from './TaskItem';

const TaskItems = ({ tasks, onDeleteClick }) => {
    if (tasks.length === 0) {
        return (
            <Paper sx={{ p: 4, textAlign: 'center' }}>
                <Typography variant="h6" color="textSecondary">
                    Nenhuma tarefa encontrada
                </Typography>
                <Button
                    variant="outlined"
                    color="primary"
                    startIcon={<AddIcon />}
                    onClick={() => window.location.href = '/tasks/new'}
                    sx={{ mt: 2 }}
                >
                    Criar uma primeira tarefa
                </Button>
            </Paper>
        );
    }

    return (
        <List sx={{ width: '100%', bgcolor: 'background.paper' }}>
            {tasks.map((task) => (
                <TaskItem
                    key={task.id}
                    task={task}
                    onDeleteClick={onDeleteClick}
                />
            ))}
        </List>
    );
};

export default TaskItems;