import '../styles/DashboardPage.css';
import ResponsiveAppBar from '../components/dashboard/ResponsiveAppBar';
import SidebarVertical from '../components/dashboard/SidebarVertical';
import { 
  Box, 
  Grid, 
  Paper, 
  Typography, 
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  IconButton,
  Avatar,
  CircularProgress,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions
} from '@mui/material';
import { 
  People as PeopleIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  Add as AddIcon
} from '@mui/icons-material';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../contexts/AuthContext';

function UsersPage() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [deleteDialog, setDeleteDialog] = useState({
    open: false,
    userId: null,
    userName: ''
  });
  const { user } = useAuth(); 

  useEffect(() => {  //
    const fetchUsers = async () => {
      try {
        const token = localStorage.getItem('token'); //
        if (!token) {
          setError('Usuário não autenticado');
          setLoading(false);
          return;
        }
// integração com backend
        const options = {
          method: 'GET',
          url: 'http://192.168.0.11:8000/api/users/',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Token ${token}`
          }
        };

        const response = await axios.request(options);
        setUsers(response.data);
        setLoading(false);
      } catch (err) {
        console.error('Erro ao carregar usuários:', err);
        setError(err.response?.data?.message || 'Erro ao carregar usuários');
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  const handleDeleteClick = (userId, userName) => {
    setDeleteDialog({
      open: true,
      userId,
      userName
    });
  };

  const handleDeleteConfirm = async () => {
    try {
      const token = localStorage.getItem('token');
      const form = new FormData();

      const options = {
        method: 'DELETE',
        url: `http://192.168.0.11:8000/api/users/${deleteDialog.userId}`,
        headers: {
          'Content-Type': 'multipart/form-data; boundary=---011000010111000001101001',
          'User-Agent': 'insomnia/11.1.0',
          'Authorization': `Token ${token}`
        },
        data: '[form]'
      };

      const response = await axios.request(options);
      console.log('Resposta da exclusão:', response.data);
      
      // Atualiza a lista de usuários após a exclusão
      setUsers(users.filter(user => user.id !== deleteDialog.userId));
      setDeleteDialog({ open: false, userId: null, userName: '' });
    } catch (error) {
      console.error('Erro detalhado:', error.response || error);
      setError('Erro ao deletar usuário. Por favor, tente novamente.');
    }
  };

  const handleDeleteCancel = () => {
    setDeleteDialog({ open: false, userId: null, userName: '' });
  };

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <Typography color="error">{error}</Typography>
      </Box>
    );
  }

  return (
    <>
      <ResponsiveAppBar />
      <div className="dashboard-layout">
        <SidebarVertical />
        
        <Box sx={{ flexGrow: 1, p: 3, ml: '330px' }}>
          <Grid container spacing={3}>
            
            {/* Cabeçalho */}
            <Grid item xs={12}>
              <Paper sx={{ 
                p: 3, 
                background: 'linear-gradient(145deg, #ffffff 0%, #f5f5f5 100%)',
                borderRadius: '12px',
                boxShadow: '0 4px 20px rgba(0,0,0,0.05)'
              }}>
                <Box sx={{ 
                  display: 'flex', 
                  justifyContent: 'space-between', 
                  alignItems: 'center', 
                  mb: 3 
                }}>
                  <Typography variant="h5" sx={{ 
                    fontWeight: 'bold', 
                    color: '#333',
                    display: 'flex',
                    alignItems: 'center',
                    gap: 1
                  }}>
                    <PeopleIcon sx={{ color: '#BE3124' }} />
                    Gerenciamento de Usuários
                  </Typography>
                  <Button 
                    variant="contained" 
                    startIcon={<AddIcon />}
                    sx={{ 
                      bgcolor: '#BE3124',
                      '&:hover': {
                        bgcolor: '#9C291E'
                      }
                    }}
                  >
                    Novo Usuário
                  </Button>
                </Box>

                {/* Tabela de Usuários */}
                <TableContainer>
                  <Table>
                    <TableHead>
                      <TableRow>
                        <TableCell>ID</TableCell>
                        <TableCell>Usuário</TableCell>
                        <TableCell>Email</TableCell>
                        <TableCell>Função</TableCell>
                        <TableCell>Status</TableCell>
                        <TableCell align="right">Ações</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {users.map((user) => (
                        <TableRow key={user.id}>
                          <TableCell>{user.id}</TableCell>
                          <TableCell>
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                              <Avatar sx={{ bgcolor: '#BE3124' }}>
                                {user.name ? user.name.charAt(0).toUpperCase() : 'U'}
                              </Avatar>
                              <Typography>{user.name || user.username}</Typography>
                            </Box>
                          </TableCell>
                          <TableCell>{user.email}</TableCell>
                          <TableCell>{user.role || 'Usuário'}</TableCell>
                          <TableCell>
                            <Typography
                              sx={{
                                color: user.is_active ? '#4CAF50' : '#FF9800',
                                fontWeight: 'bold'
                              }}
                            >
                              {user.is_active ? 'Ativo' : 'Inativo'}
                            </Typography>
                          </TableCell>
                          <TableCell align="right">
                            <IconButton 
                              onClick={() => handleDeleteClick(user.id, user.name || user.username)}
                              color="error"
                              size="small"
                            >
                              <DeleteIcon />
                            </IconButton>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              </Paper>
            </Grid>
          </Grid>
        </Box>
      </div>

      {/* Diálogo de Confirmação de Exclusão */}
      <Dialog
        open={deleteDialog.open}
        onClose={handleDeleteCancel}
      >
        <DialogTitle>Confirmar Exclusão</DialogTitle>
        <DialogContent>
          <Typography>
            Você tem certeza que deseja excluir o usuário ID {deleteDialog.userId} - {deleteDialog.userName}?
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDeleteCancel} color="primary">
            Cancelar
          </Button>
          <Button onClick={handleDeleteConfirm} color="error" variant="contained">
            Excluir
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default UsersPage; 