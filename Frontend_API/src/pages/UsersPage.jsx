import '../styles/DashboardPage.css';
import ResponsiveAppBar from '../components/dashboard/ResponsiveAppBar';
import SidebarVertical from '../components/dashboard/SidebarVertical';
import EditUserDialog from '../components/users/EditUserDialog';
import NewUserDialog from '../components/users/NewUserDialog';
import DeleteUserDialog from '../components/users/DeleteUserDialog';
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
  Pagination
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
import { useNavigate } from 'react-router-dom';

function UsersPage() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [deleteDialog, setDeleteDialog] = useState({
    open: false,
    userId: null,
    userName: ''
  });
  const [newUserDialog, setNewUserDialog] = useState({
    open: false,
    name: '',
    email: '',
    password: ''
  });
  const [editUserDialog, setEditUserDialog] = useState({
    open: false,
    userId: null,
    name: '',
    email: '',
    password: ''
  });
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('access_token');
    if (!token) {
      navigate('/login');
      return;
    }
    fetchUsers();
  }, [page, navigate]);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem('access_token');
      if (!token) {
        setError('Usuário não autenticado');
        setLoading(false);
        navigate('/login');
        return;
      }

      const options = {
        method: 'GET',
        url: 'http://192.168.0.9:8000/user/listall/',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      };

      const response = await axios.request(options);
      
      if (response.data && typeof response.data === 'object') {
        const userList = Array.isArray(response.data) ? response.data : 
                        response.data.users || response.data.data || response.data.results || [];
        
        if (Array.isArray(userList)) {
          setUsers(userList);
          setTotalPages(Math.ceil(userList.length / 5));
          setError(null);
        } else {
          setError('Formato de resposta inválido: lista de usuários não encontrada');
        }
      } else {
        setError('Formato de resposta inválido: dados não encontrados');
      }
    } catch (err) {
      console.error('Erro ao carregar usuários:', err);
      if (err.response?.status === 401) {
        setError('Sessão expirada. Por favor, faça login novamente.');
        navigate('/login');
      } else {
        setError(err.response?.data?.message || 'Erro ao carregar usuários');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteClick = (userId, userName) => {
    setDeleteDialog({
      open: true,
      userId,
      userName
    });
  };

  const handleDeleteConfirm = async () => {
    try {
      const token = localStorage.getItem('access_token');
      
      const options = {
        method: 'DELETE',
        url: `http://192.168.0.9:8000/user/delete/${deleteDialog.userId}/`,
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/x-www-form-urlencoded',
          'Authorization': `Bearer ${token}`
        }
      };

      await axios.request(options);
      setUsers(users.filter(user => user.id !== deleteDialog.userId));
      setDeleteDialog({ open: false, userId: null, userName: '' });
    } catch (error) {
      console.error('Erro ao deletar usuário:', error);
      setError(error.response?.data?.message || 'Erro ao deletar usuário');
    }
  };

  const handleNewUserClick = () => {
    setNewUserDialog({
      open: true,
      name: '',
      email: '',
      password: ''
    });
  };

  const handleNewUserSubmit = async () => {
    try {
      const userData = {
        email: newUserDialog.email,
        username: newUserDialog.name.toLowerCase().replace(/\s+/g, ''),
        password: newUserDialog.password
      };

      console.log('Dados do novo usuário:', userData);

      const response = await axios.post(
        'http://192.168.0.9:8000/user/register/',
        userData,
        {
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          }
        }
      );

      console.log('Resposta do servidor:', response.data);

      if (response.data) {
        setUsers(prevUsers => [...prevUsers, response.data]);
        setNewUserDialog({ open: false, name: '', email: '', password: '' });
        setError(null);
      }
    } catch (error) {
      console.error('Erro ao criar usuário:', error);
      if (error.response) {
        console.error('Detalhes do erro:', error.response.data);
        setError(error.response.data.message || 'Erro ao criar usuário');
      } else {
        setError('Erro ao conectar com o servidor');
      }
    }
  };

  const handleEditClick = (user) => {
    setEditUserDialog({
      open: true,
      userId: user.id,
      name: user.name || user.username,
      email: user.email,
      password: ''
    });
  };

  const handleEditSubmit = async () => {
    try {
      const token = localStorage.getItem('access_token');
      
      const formData = new URLSearchParams();
      if (editUserDialog.email) formData.append('email', editUserDialog.email);
      if (editUserDialog.name) formData.append('username', editUserDialog.name.toLowerCase().replace(/\s+/g, ''));
      if (editUserDialog.password) formData.append('password', editUserDialog.password);

      const options = {
        method: 'PUT',
        url: `http://192.168.0.9:8000/user/${editUserDialog.userId}/`,
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/x-www-form-urlencoded',
          'Authorization': `Bearer ${token}`
        },
        data: formData
      };

      const response = await axios.request(options);
      setUsers(users.map(user => 
        user.id === editUserDialog.userId ? response.data : user
      ));
      setEditUserDialog({ open: false, userId: null, name: '', email: '', password: '' });
    } catch (error) {
      console.error('Erro ao atualizar usuário:', error);
      setError(error.response?.data?.message || 'Erro ao atualizar usuário');
    }
  };

  const handlePageChange = (event, value) => {
    setPage(value);
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
    <Box sx={{ display: 'flex', minHeight: '100vh' }}>
      <ResponsiveAppBar />
      <SidebarVertical />
      
      <Box component="main" sx={{ flexGrow: 1, p: 3, mt: 8, ml: '240px', width: 'calc(100% - 240px)' }}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Paper sx={{ p: 3, borderRadius: 2, width: '100%' }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                <Typography variant="h5" sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <PeopleIcon color="primary" />
                  Gerenciamento de Usuários
                </Typography>
                <Button
                  variant="contained"
                  startIcon={<AddIcon />}
                  onClick={handleNewUserClick}
                  color="primary"
                >
                  Novo Usuário
                </Button>
              </Box>

              {error && (
                <Typography color="error" sx={{ mb: 2 }}>
                  {error}
                </Typography>
              )}

              <TableContainer sx={{ width: '100%', overflowX: 'auto' }}>
                <Table sx={{ minWidth: 1200 }}> {/* tamanho da tabela */}
                  <TableHead>
                    <TableRow>
                      <TableCell sx={{ width: '5%' }}>ID</TableCell>
                      <TableCell sx={{ width: '5%' }}>Avatar</TableCell>
                      <TableCell sx={{ width: '5%' }}>Nome</TableCell>
                      <TableCell sx={{ width: '5%' }}>Email</TableCell>
                      <TableCell sx={{ width: '5%' }}>Username</TableCell>
                      <TableCell sx={{ width: '5%' }} align="right">Ações</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {users.map((user) => (
                      <TableRow key={user.id}>
                        <TableCell>{user.id}</TableCell>
                        <TableCell>
                          <Avatar sx={{ width: 40, height: 40 }}>
                            {user.name ? user.name[0].toUpperCase() : user.username[0].toUpperCase()}
                          </Avatar>
                        </TableCell>
                        <TableCell>{user.name || user.username}</TableCell>
                        <TableCell>{user.email}</TableCell>
                        <TableCell>{user.username}</TableCell>
                        <TableCell align="right">
                          <IconButton
                            onClick={() => handleEditClick(user)}
                            color="primary"
                            size="large"
                          >
                            <EditIcon />
                          </IconButton>
                          <IconButton
                            onClick={() => handleDeleteClick(user.id, user.name || user.username)}
                            color="error"
                            size="large"
                          >
                            <DeleteIcon />
                          </IconButton>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>

              <Box sx={{ display: 'flex', justifyContent: 'center', mt: 3 }}>
                <Pagination
                  count={totalPages}
                  page={page}
                  onChange={handlePageChange}
                  color="primary"
                />
              </Box>
            </Paper>
          </Grid>
        </Grid>
      </Box>

      <NewUserDialog
        open={newUserDialog.open}
        onClose={() => setNewUserDialog({ ...newUserDialog, open: false })}
        onSubmit={handleNewUserSubmit}
        userData={newUserDialog}
        setUserData={setNewUserDialog}
      />

      <EditUserDialog
        open={editUserDialog.open}
        onClose={() => setEditUserDialog({ ...editUserDialog, open: false })}
        onSubmit={handleEditSubmit}
        userData={editUserDialog}
        setUserData={setEditUserDialog}
      />

      <DeleteUserDialog
        open={deleteDialog.open}
        onClose={() => setDeleteDialog({ ...deleteDialog, open: false })}
        onConfirm={handleDeleteConfirm}
        userName={deleteDialog.userName}
      />
    </Box>
  );
}

export default UsersPage; 