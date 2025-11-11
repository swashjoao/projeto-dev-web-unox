import React from 'react';
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Button,
} from '@mui/material';

const DeleteTaskDialog = ({
  open,
  task,
  onClose,
  onConfirm,
}) => {
  const handleConfirm = () => {
    onConfirm(task.id);
    onClose();
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">
        Confirmar exclusão
      </DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          Tem certeza que deseja excluir a tarefa "{task?.nome}"? 
          Esta ação não pode ser desfeita.
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          Cancelar
        </Button>
        <Button 
          onClick={handleConfirm} 
          color="error" 
          variant="contained"
          autoFocus
        >
          Confirmar
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default DeleteTaskDialog;