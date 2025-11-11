import React, { useState, useEffect } from 'react';
import { 
  Container, 
  Typography, 
  Button, 
  List, 
  ListItem, 
  ListItemText, 
  ListItemSecondaryAction, 
  IconButton,
  Box,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  CircularProgress
} from '@mui/material';
import { Add as AddIcon, Edit as EditIcon, Delete as DeleteIcon } from '@mui/icons-material';

const Categories = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [openDialog, setOpenDialog] = useState(false);
  const [currentCategory, setCurrentCategory] = useState({ id: null, nome: '' });
  const [error, setError] = useState('');

  // Carregar categorias
  const loadCategories = async () => {
    try {
      setLoading(true);
      // Substitua pela chamada real à API quando disponível
      // const response = await api.get('/categorias');
      // setCategories(response.data);
      
      // Dados mockados temporariamente
      setTimeout(() => {
        setCategories([
          { id: 1, nome: 'Trabalho' },
          { id: 2, nome: 'Estudos' },
          { id: 3, nome: 'Pessoal' },
        ]);
        setLoading(false);
      }, 500);
    } catch (error) {
      console.error('Erro ao carregar categorias:', error);
      setError('Não foi possível carregar as categorias.');
      setLoading(false);
    }
  };

  useEffect(() => {
    loadCategories();
  }, []);

  const handleOpenDialog = (category = null) => {
    setCurrentCategory(category || { id: null, nome: '' });
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setCurrentCategory({ id: null, nome: '' });
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!currentCategory.nome.trim()) {
      setError('O nome da categoria é obrigatório');
      return;
    }

    try {
      setLoading(true);
      
      if (currentCategory.id) {
        // Atualizar categoria existente
        // await api.put(`/categorias/${currentCategory.id}`, { nome: currentCategory.nome });
        setCategories(categories.map(cat => 
          cat.id === currentCategory.id 
            ? { ...cat, nome: currentCategory.nome } 
            : cat
        ));
      } else {
        // Criar nova categoria
        // const response = await api.post('/categorias', { nome: currentCategory.nome });
        const newCategory = {
          id: Math.max(0, ...categories.map(c => c.id)) + 1,
          nome: currentCategory.nome
        };
        setCategories([...categories, newCategory]);
      }
      
      handleCloseDialog();
    } catch (error) {
      console.error('Erro ao salvar categoria:', error);
      setError('Não foi possível salvar a categoria. Tente novamente.');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Tem certeza que deseja excluir esta categoria?')) {
      try {
        setLoading(true);
        // await api.delete(`/categorias/${id}`);
        setCategories(categories.filter(cat => cat.id !== id));
      } catch (error) {
        console.error('Erro ao excluir categoria:', error);
        setError('Não foi possível excluir a categoria. Tente novamente.');
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <Container maxWidth="md">
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
        <Typography variant="h4" component="h1">
          Categorias
        </Typography>
        <Button
          variant="contained"
          color="primary"
          startIcon={<AddIcon />}
          onClick={() => handleOpenDialog()}
          disabled={loading}
        >
          Nova Categoria
        </Button>
      </Box>

      {error && (
        <Box mb={2}>
          <Typography color="error">{error}</Typography>
        </Box>
      )}

      {loading && categories.length === 0 ? (
        <Box display="flex" justifyContent="center" my={4}>
          <CircularProgress />
        </Box>
      ) : (
        <List>
          {categories.map((category) => (
            <ListItem key={category.id} divider>
              <ListItemText primary={category.nome} />
              <ListItemSecondaryAction>
                <IconButton 
                  edge="end" 
                  aria-label="editar"
                  onClick={() => handleOpenDialog(category)}
                  disabled={loading}
                >
                  <EditIcon />
                </IconButton>
                <IconButton 
                  edge="end" 
                  aria-label="deletar"
                  onClick={() => handleDelete(category.id)}
                  disabled={loading}
                  color="error"
                >
                  <DeleteIcon />
                </IconButton>
              </ListItemSecondaryAction>
            </ListItem>
          ))}
          {categories.length === 0 && (
            <Typography variant="body1" color="textSecondary" align="center" my={2}>
              Nenhuma categoria cadastrada.
            </Typography>
          )}
        </List>
      )}

      {/* Diálogo para adicionar/editar categoria */}
      <Dialog open={openDialog} onClose={handleCloseDialog} maxWidth="sm" fullWidth>
        <form onSubmit={handleSubmit}>
          <DialogTitle>
            {currentCategory.id ? 'Editar Categoria' : 'Nova Categoria'}
          </DialogTitle>
          <DialogContent>
            <TextField
              autoFocus
              margin="dense"
              label="Nome da Categoria"
              type="text"
              fullWidth
              variant="outlined"
              value={currentCategory.nome}
              onChange={(e) => setCurrentCategory({...currentCategory, nome: e.target.value})}
              disabled={loading}
              error={!!error}
              helperText={error}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseDialog} disabled={loading}>
              Cancelar
            </Button>
            <Button 
              type="submit" 
              color="primary" 
              variant="contained"
              disabled={loading}
              startIcon={loading ? <CircularProgress size={20} /> : null}
            >
              {currentCategory.id ? 'Salvar' : 'Adicionar'}
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </Container>
  );
};

export default Categories;