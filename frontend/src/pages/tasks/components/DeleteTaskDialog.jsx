import React from 'react';
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Button,
  CircularProgress,
  Box,
  Typography
} from '@mui/material';
import { Delete as DeleteIcon } from '@mui/icons-material';

const DeleteTaskDialog = ({
  open,
  task = {},
  onClose,
  onConfirm,
  loading = false
}) => {
  const handleConfirm = () => {
    if (task && task.id) {
      onConfirm(task.id);
    }
  };

  return (
    <Dialog
      open={open}
      onClose={loading ? undefined : onClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
      maxWidth="sm"
      fullWidth
    >
      <DialogTitle id="alert-dialog-title" sx={{ display: 'flex', alignItems: 'center' }}>
        <DeleteIcon color="error" sx={{ mr: 1 }} />
        Confirmar Exclusão
      </DialogTitle>
      
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          <Typography component="span">
            Tem certeza que deseja excluir a tarefa 
          </Typography>
          <Typography component="span" fontWeight="bold">
            "{task?.nome || 'esta tarefa'}"
          </Typography>
          <Typography component="span">
            ? Esta ação não pode ser desfeita.
          </Typography>
        </DialogContentText>
      </DialogContent>
      
      <DialogActions sx={{ p: 2 }}>
        <Button 
          onClick={onClose} 
          color="inherit"
          disabled={loading}
          sx={{ mr: 1 }}
        >
          Cancelar
        </Button>
        <Button 
          onClick={handleConfirm} 
          color="error" 
          variant="contained"
          disabled={loading}
          startIcon={loading ? <CircularProgress size={20} color="inherit" /> : <DeleteIcon />}
        >
          {loading ? 'Excluindo...' : 'Excluir'}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default DeleteTaskDialog;