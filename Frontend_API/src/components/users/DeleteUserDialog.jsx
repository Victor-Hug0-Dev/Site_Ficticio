import React from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography
} from '@mui/material';
import { Delete as DeleteIcon } from '@mui/icons-material';

const DeleteUserDialog = ({ 
  open, 
  onClose, 
  onConfirm, 
  userId, 
  userName 
}) => {
  return (
    <Dialog
      open={open}
      onClose={onClose}
      PaperProps={{
        sx: {
          borderRadius: '12px',
          boxShadow: '0 8px 32px rgba(0,0,0,0.1)',
        }
      }}
    >
      <DialogTitle sx={{ 
        bgcolor: '#f5f5f5',
        borderBottom: '1px solid #e0e0e0',
        py: 2,
        display: 'flex',
        alignItems: 'center',
        gap: 1
      }}>
        <DeleteIcon sx={{ color: '#BE3124' }} />
        <Typography variant="h6" sx={{ fontWeight: 'bold', color: '#333' }}>
          Confirmar Exclusão
        </Typography>
      </DialogTitle>
      <DialogContent sx={{ mt: 2 }}>
        <Typography>
          Você tem certeza que deseja excluir o usuário ID {userId} - {userName}?
        </Typography>
      </DialogContent>
      <DialogActions sx={{ 
        px: 3, 
        py: 2, 
        borderTop: '1px solid #e0e0e0',
        bgcolor: '#f5f5f5'
      }}>
        <Button 
          onClick={onClose} 
          variant="outlined"
          sx={{ 
            borderColor: '#BE3124',
            color: '#BE3124',
            '&:hover': {
              borderColor: '#9C291E',
              bgcolor: 'rgba(190, 49, 36, 0.04)'
            }
          }}
        >
          Cancelar
        </Button>
        <Button 
          onClick={onConfirm} 
          variant="contained"
          color="error"
          sx={{ 
            bgcolor: '#BE3124',
            '&:hover': {
              bgcolor: '#9C291E'
            }
          }}
        >
          Excluir
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default DeleteUserDialog; 