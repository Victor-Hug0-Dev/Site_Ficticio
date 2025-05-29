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
  TextField,
  Pagination,
  InputAdornment
} from '@mui/material';
import { 
  People as PeopleIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  Add as AddIcon,
  Search as SearchIcon
} from '@mui/icons-material';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../contexts/AuthContext';

function UsersPage() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
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

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          setError('Usuário não autenticado');
          setLoading(false);
          return;
        }

        const options = {
          method: 'GET',
          url: `http://127.0.0.1:8000//api/users/?page=${page}`,
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Token ${token}`
          }
        };

        const response = await axios.request(options);
        setUsers(response.data.results || response.data);
        setTotalPages(Math.ceil((response.data.count || response.data.length) / 5));
        setLoading(false);
      } catch (err) {
        console.error('Erro ao carregar usuários:', err);
        setError(err.response?.data?.message || 'Erro ao carregar usuários');
        setLoading(false);
      }
    };

    fetchUsers();
  }, [page]);

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
      
      const options = {
        method: 'DELETE',
        url: `http://127.0.0.1:8000//api/users/${deleteDialog.userId}/`,
        headers: {
          'Authorization': `Token ${token}`
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
      const token = localStorage.getItem('token');
      const formData = new FormData();
      formData.append('username', newUserDialog.name.toLowerCase().replace(/\s+/g, ''));
      formData.append('email', newUserDialog.email);
      formData.append('password', newUserDialog.password);
      formData.append('name', newUserDialog.name);

      const options = {
        method: 'POST',
        url: 'http://127.0.0.1:8000//api/users/',
        headers: {
          'Authorization': `Token ${token}`
        },
        data: formData
      };

      const response = await axios.request(options);
      setUsers([...users, response.data]);
      setNewUserDialog({ open: false, name: '', email: '', password: '' });
    } catch (error) {
      console.error('Erro ao criar usuário:', error);
      setError(error.response?.data?.message || 'Erro ao criar usuário');
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
      const token = localStorage.getItem('token');
      
      // Criando um objeto com os dados a serem atualizados
      const updateData = {};
      
      // Só adiciona os campos que foram modificados
      if (editUserDialog.name) {
        updateData.username = editUserDialog.name.toLowerCase().replace(/\s+/g, '');
      }
      if (editUserDialog.email) updateData.email = editUserDialog.email;
      if (editUserDialog.password) updateData.password = editUserDialog.password;

      console.log('Dados do diálogo:', editUserDialog);
      console.log('Dados a serem enviados:', updateData);

      const options = {
        method: 'PATCH',
        url: `http://127.0.0.1:8000//api/users/${editUserDialog.userId}/`,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Token ${token}`
        },
        data: updateData
      };

      const response = await axios.request(options);
      console.log('Resposta da API:', response.data);
      
      // Atualiza a lista de usuários com os dados atualizados
      setUsers(users.map(user => 
        user.id === editUserDialog.userId ? response.data : user
      ));
      
      setEditUserDialog({ open: false, userId: null, name: '', email: '', password: '' });
    } catch (error) {
      console.error('Erro ao atualizar usuário:', error);
      console.error('Detalhes do erro:', error.response?.data);
      setError(error.response?.data?.message || 'Erro ao atualizar usuário');
    }
  };

  const handlePageChange = (event, value) => {
    setPage(value);
  };

  const filteredUsers = users.filter((user) => {
    const query = searchQuery.toLowerCase().trim();
    if (!query) return true;
    
    return (
      (user.id && user.id.toString().includes(query)) ||
      (user.name && user.name.toLowerCase().includes(query)) ||
      (user.username && user.username.toLowerCase().includes(query)) ||
      (user.email && user.email.toLowerCase().includes(query))
    );
  });

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
            <Grid item xs={12}>
              <Paper sx={{ 
                p: 3, 
                background: 'linear-gradient(145deg, #ffffff 0%, #f5f5f5 100%)',
                borderRadius: '12px',
                boxShadow: '0 4px 20px rgba(0,0,0,0.05)',
                width: '1900px',
                height: '800px'
              }}>
                <Box sx={{ 
                  display: 'flex', 
                  justifyContent: 'space-between', 
                  alignItems: 'center', 
                  mb: 3,
                  flexWrap: 'wrap',
                  gap: 2
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

                  <Box sx={{ display: 'flex', gap: 2 }}>
                    <TextField 
                      variant="outlined" 
                      size="small"
                      placeholder="Buscar por nome ou e-mail"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      sx={{
                        width: '400px',
                        '& .MuiOutlinedInput-root': {
                          '&:hover fieldset': {
                            borderColor: '#BE3124',
                          },
                          '&.Mui-focused fieldset': {
                            borderColor: '#BE3124',
                          },
                        },
                        '& .MuiInputLabel-root.Mui-focused': {
                          color: '#BE3124',
                        },
                      }}
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <SearchIcon sx={{ 
                              color: '#BE3124',
                              fontSize: '1.5rem'
                            }} />
                          </InputAdornment>
                        ),
                        sx: {
                          height: '45px',
                          fontSize: '1rem'
                        }
                      }}
                    />
                    
                    <Button 
                      variant="contained" 
                      startIcon={<AddIcon />}
                      onClick={handleNewUserClick}
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
                </Box>

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
                      {filteredUsers.map((user) => (
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
                              onClick={() => handleEditClick(user)}
                              color="primary"
                              size="small"
                              sx={{ mr: 1 }}
                            >
                              <EditIcon />
                            </IconButton>
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
      </div>

      <DeleteUserDialog
        open={deleteDialog.open}
        onClose={() => setDeleteDialog({ open: false, userId: null, userName: '' })}
        onConfirm={handleDeleteConfirm}
        userId={deleteDialog.userId}
        userName={deleteDialog.userName}
      />

      <NewUserDialog
        open={newUserDialog.open}
        onClose={() => setNewUserDialog({ open: false, name: '', email: '', password: '' })}
        onSave={handleNewUserSubmit}
        userData={newUserDialog}
        setUserData={setNewUserDialog}
      />

      <EditUserDialog
        open={editUserDialog.open}
        onClose={() => setEditUserDialog({ open: false, userId: null, name: '', email: '', password: '' })}
        onSave={handleEditSubmit}
        userData={editUserDialog}
        setUserData={setEditUserDialog}
      />
    </>
  );
}

export default UsersPage; 