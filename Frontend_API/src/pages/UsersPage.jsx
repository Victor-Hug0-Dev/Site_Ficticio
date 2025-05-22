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
  DialogActions,
  TextField,
  Pagination
} from '@mui/material';
import { 
  People as PeopleIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  Add as AddIcon,
  Email as EmailIcon,
  Lock as LockIcon
} from '@mui/icons-material';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../contexts/AuthContext';
import SearchIcon from '@mui/icons-material/Search';
import InputAdornment from '@mui/material/InputAdornment';


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
          url: `http://127.0.0.1:8000//api/users/?page=${page}`, // api pages
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
          'Content-Type': 'multipart/form-data',
          'Authorization': `Token ${token}`
        }
      };

      console.log('Tentando deletar usuário com as seguintes opções:', options);
      
      const response = await axios.request(options);
      console.log('Resposta da API:', response);
      
      // Atualiza a lista de usuários removendo o usuário excluído
      setUsers(users.filter(user => user.id !== deleteDialog.userId));
      setDeleteDialog({ open: false, userId: null, userName: '' });
    } catch (error) {
      console.error('Erro detalhado ao deletar usuário:', {
        mensagem: error.message,
        resposta: error.response?.data,
        status: error.response?.status,
        headers: error.response?.headers
      });
      setError(`Erro ao deletar usuário: ${error.response?.data?.message || error.message}`);
    }
  };

  const handleDeleteCancel = () => {
    setDeleteDialog({ open: false, userId: null, userName: '' });
  };

  const handleNewUserClick = () => {
    setNewUserDialog({
      open: true,
      name: '',
      email: '',
      password: ''
    });
  };

  const handleNewUserClose = () => {
    setNewUserDialog({
      open: false,
      name: '',
      email: '',
      password: ''
    });
  };

  const handleNewUserSubmit = async () => {
    try {
      const token = localStorage.getItem('token');
      const formData = new FormData();
      formData.append('username', newUserDialog.name.toLowerCase().replace(/\s+/g, '')); // Converte nome em username
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
      handleNewUserClose();
    } catch (error) {
      console.error('Erro ao criar usuário:', error);
      setError(error.response?.data?.message || 'Erro ao criar usuário. Por favor, tente novamente.');
    }
  };

  const handlePageChange = (event, value) => {
    setPage(value);
  };

  // Função para filtrar usuários
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
                boxShadow: '0 4px 20px rgba(0,0,0,0.05)'
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
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <SearchIcon />
                          </InputAdornment>
                        ),
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

      {/* Diálogo de Novo Usuário */}
      <Dialog
        open={newUserDialog.open}
        onClose={handleNewUserClose}
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
          gap: 1
        }}>
          <PeopleIcon sx={{ color: '#BE3124' }} />
          <Typography variant="h6" sx={{ fontWeight: 'bold', color: '#333' }}>
            Novo Usuário
          </Typography>
        </DialogTitle>
        <DialogContent sx={{ mt: 2 }}>
          <Box sx={{ 
            display: 'flex', 
            flexDirection: 'column', 
            gap: 3,
            '& .MuiTextField-root': {
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
            },
          }}>
            <TextField
              label="Nome Completo"
              fullWidth
              value={newUserDialog.name}
              onChange={(e) => setNewUserDialog({ ...newUserDialog, name: e.target.value })}
              placeholder="Digite o nome completo do usuário"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <PeopleIcon sx={{ color: '#BE3124' }} />
                  </InputAdornment>
                ),
              }}
            />
            <TextField
              label="Email"
              fullWidth
              type="email"
              value={newUserDialog.email}
              onChange={(e) => setNewUserDialog({ ...newUserDialog, email: e.target.value })}
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
              label="Senha"
              fullWidth
              type="password"
              value={newUserDialog.password}
              onChange={(e) => setNewUserDialog({ ...newUserDialog, password: e.target.value })}
              placeholder="Digite uma senha segura"
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
            onClick={handleNewUserClose} 
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
            onClick={handleNewUserSubmit} 
            variant="contained"
            sx={{ 
              bgcolor: '#BE3124',
              '&:hover': {
                bgcolor: '#9C291E'
              }
            }}
          >
            Criar Usuário
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default UsersPage; 