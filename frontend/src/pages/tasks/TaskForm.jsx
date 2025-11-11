import React, { useState, useEffect } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  FormHelperText,
  CircularProgress
} from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import ptBR from 'date-fns/locale/pt-BR';

const TaskForm = ({ 
  open, 
  handleClose, 
  handleSubmit, 
  task = null,
  loading = false,
  categorias = []
}) => {
  const [formData, setFormData] = useState({
    titulo: '',
    descricao: '',
    dataVencimento: null,
    prioridade: 'media',
    categoriaId: ''
  });
  const [errors, setErrors] = useState({});

  // Preencher formulário se estiver editando
  useEffect(() => {
    if (task) {
      setFormData({
        titulo: task.titulo || '',
        descricao: task.descricao || '',
        dataVencimento: task.dataVencimento ? new Date(task.dataVencimento) : null,
        prioridade: task.prioridade || 'media',
        categoriaId: task.categoriaId || ''
      });
    } else {
      // Resetar formulário para nova tarefa
      setFormData({
        titulo: '',
        descricao: '',
        dataVencimento: null,
        prioridade: 'media',
        categoriaId: ''
      });
    }
    setErrors({});
  }, [task, open]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Limpar erro do campo ao modificar
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handleDateChange = (date) => {
    setFormData(prev => ({
      ...prev,
      dataVencimento: date
    }));
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.titulo.trim()) {
      newErrors.titulo = 'O título é obrigatório';
    }
    
    if (formData.categoriaId === '') {
      newErrors.categoriaId = 'Selecione uma categoria';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const onSubmit = (e) => {
    e.preventDefault();
    
    if (validateForm()) {
      handleSubmit({
        ...formData,
        // Garantir que a data esteja no formato correto
        dataVencimento: formData.dataVencimento ? formData.dataVencimento.toISOString() : null
      });
    }
  };

  return (
    <Dialog 
      open={open} 
      onClose={!loading ? handleClose : null}
      maxWidth="sm"
      fullWidth
    >
      <form onSubmit={onSubmit}>
        <DialogTitle>
          {task ? 'Editar Tarefa' : 'Nova Tarefa'}
        </DialogTitle>
        
        <DialogContent dividers>
          <TextField
            autoFocus
            margin="normal"
            name="titulo"
            label="Título"
            type="text"
            fullWidth
            variant="outlined"
            value={formData.titulo}
            onChange={handleChange}
            error={!!errors.titulo}
            helperText={errors.titulo}
            disabled={loading}
          />
          
          <TextField
            margin="normal"
            name="descricao"
            label="Descrição"
            type="text"
            fullWidth
            multiline
            rows={4}
            variant="outlined"
            value={formData.descricao}
            onChange={handleChange}
            disabled={loading}
          />
          
          <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={ptBR}>
            <DatePicker
              label="Data de Vencimento"
              value={formData.dataVencimento}
              onChange={handleDateChange}
              renderInput={(params) => (
                <TextField
                  {...params}
                  fullWidth
                  margin="normal"
                  disabled={loading}
                />
              )}
            />
          </LocalizationProvider>
          
          <FormControl fullWidth margin="normal" error={!!errors.categoriaId}>
            <InputLabel id="categoria-label">Categoria</InputLabel>
            <Select
              labelId="categoria-label"
              name="categoriaId"
              value={formData.categoriaId}
              label="Categoria"
              onChange={handleChange}
              disabled={loading}
            >
              <MenuItem value="">
                <em>Selecione uma categoria</em>
              </MenuItem>
              {categorias.map(categoria => (
                <MenuItem key={categoria.id} value={categoria.id}>
                  {categoria.nome}
                </MenuItem>
              ))}
            </Select>
            {errors.categoriaId && (
              <FormHelperText>{errors.categoriaId}</FormHelperText>
            )}
          </FormControl>
          
          <FormControl fullWidth margin="normal">
            <InputLabel id="prioridade-label">Prioridade</InputLabel>
            <Select
              labelId="prioridade-label"
              name="prioridade"
              value={formData.prioridade}
              label="Prioridade"
              onChange={handleChange}
              disabled={loading}
            >
              <MenuItem value="baixa">Baixa</MenuItem>
              <MenuItem value="media">Média</MenuItem>
              <MenuItem value="alta">Alta</MenuItem>
            </Select>
          </FormControl>
        </DialogContent>
        
        <DialogActions>
          <Button 
            onClick={handleClose} 
            disabled={loading}
            color="inherit"
          >
            Cancelar
          </Button>
          <Button 
            type="submit" 
            color="primary" 
            variant="contained"
            disabled={loading}
            startIcon={loading ? <CircularProgress size={20} /> : null}
          >
            {loading ? 'Salvando...' : 'Salvar'}
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default TaskForm;