import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';
import { TextField } from '@mui/material';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import React, { useState, useEffect } from 'react';
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    FormHelperText,
    CircularProgress
} from '@mui/material';

const TaskForm = ({
                      open,
                      handleClose,
                      handleSubmit,
                      initialData = null,
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

    // Atualizar o formulário quando initialData ou open mudar
    useEffect(() => {
        if (initialData) {
            setFormData({
                titulo: initialData.titulo || '',
                descricao: initialData.descricao || '',
                dataVencimento: initialData.dataVencimento ? new Date(initialData.dataVencimento) : null,
                prioridade: initialData.prioridade || 'media',
                categoriaId: initialData.categoriaId || ''
            });
        } else {
            // Resetar para valores padrão
            setFormData({
                titulo: '',
                descricao: '',
                dataVencimento: null,
                prioridade: 'media',
                categoriaId: ''
            });
        }
        setErrors({});
    }, [initialData, open]);

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

    const handleDateChange = (newValue) => {
        setFormData((prev) => ({
            ...prev,
            dataVencimento: newValue ? newValue.toISOString() : null,
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
                    {initialData ? 'Editar Tarefa' : 'Nova Tarefa'}
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

                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DatePicker
                            label="Data de Vencimento"
                            value={
                                formData.dataVencimento
                                    ? dayjs(formData.dataVencimento)
                                    : null
                            }
                            onChange={(newValue) => handleDateChange(newValue)}
                            enableAccessibleFieldDOMStructure={false} // <- ESSA LINHA MATA O ERRO
                            slots={{ textField: TextField }}
                            slotProps={{
                                textField: {
                                    fullWidth: true,
                                    margin: 'normal',
                                    disabled: loading,
                                },
                            }}
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