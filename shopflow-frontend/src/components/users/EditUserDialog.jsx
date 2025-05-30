import React from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Box,
  Typography,
  InputAdornment
} from '@mui/material';
import {
  Edit as EditIcon,
  People as PeopleIcon,
  Email as EmailIcon,
  Lock as LockIcon
} from '@mui/icons-material';

const EditUserDialog = ({ 
  open, 
  onClose, 
  onSave, 
  userData, 
  setUserData 
}) => {
  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="sm"
      fullWidth
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
        gap: 1,
        mb: 2
      }}>
        <EditIcon sx={{ color: '#BE3124' }} />
        <Typography variant="h6" sx={{ fontWeight: 'bold', color: '#333' }}>
          Editar Usuário
        </Typography>
      </DialogTitle>
      <DialogContent>
        <Box sx={{ 
          display: 'flex', 
          flexDirection: 'column', 
          gap: 3,
          mt: 2,
          '& .MuiTextField-root': {
            marginTop: '8px',
            '& .MuiOutlinedInput-root': {
              '&:hover fieldset': {
                borderColor: '#BE3124',
              },
              '&.Mui-focused fieldset': {
                borderColor: '#BE3124',
              },
            },
            '& .MuiInputLabel-root': {
              textShadow: 'none',
              color: '#666',
              backgroundColor: 'white',
              padding: '0 4px',
              transform: 'translate(14px, -9px) scale(0.75)',
              '&.Mui-focused': {
                color: '#BE3124',
              }
            },
            '& .MuiInputBase-input': {
              textShadow: 'none',
              padding: '16.5px 14px'
            }
          },
        }}>
          <TextField
            label="Usuário"
            fullWidth
            value={userData.name}
            onChange={(e) => setUserData({ ...userData, name: e.target.value })}
            placeholder="Digite o novo nome do usuário"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <PeopleIcon sx={{ color: '#BE3124' }} />
                </InputAdornment>
              ),
            }}
            sx={{ 
              '& .MuiInputLabel-root': {
                transform: 'translate(14px, -9px) scale(0.75)',
                '&.Mui-focused': {
                  transform: 'translate(14px, -9px) scale(0.75)'
                }
              }
            }}
          />
          <TextField
            label="Email"
            fullWidth
            type="email"
            value={userData.email}
            onChange={(e) => setUserData({ ...userData, email: e.target.value })}
            placeholder="exemplo@email.com"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <EmailIcon sx={{ color: '#BE3124' }} />
                </InputAdornment>
              ),
            }}
          />
          <TextField
            label="Nova Senha (opcional)"
            fullWidth
            type="password"
            value={userData.password}
            onChange={(e) => setUserData({ ...userData, password: e.target.value })}
            placeholder="Deixe em branco para manter a senha atual"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <LockIcon sx={{ color: '#BE3124' }} />
                </InputAdornment>
              ),
            }}
          />
        </Box>
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
          onClick={onSave} 
          variant="contained"
          sx={{ 
            bgcolor: '#BE3124',
            '&:hover': {
              bgcolor: '#9C291E'
            }
          }}
        >
          Salvar Alterações
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default EditUserDialog; 