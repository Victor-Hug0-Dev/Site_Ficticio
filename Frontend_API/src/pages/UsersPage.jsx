import '../styles/DashboardPage.css';
import ResponsiveAppBar from '../components/dashboard/ResponsiveAppBar';
import SidebarVertical from '../components/dashboard/SidebarVertical';
import { 
  Box, 
  Grid, 
  Paper, 
  Typography, 
  Card, 
  CardContent,
  Stack,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  IconButton,
  Avatar,
  CircularProgress
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
                              size="small" 
                              sx={{ 
                                color: '#BE3124',
                                '&:hover': {
                                  bgcolor: 'rgba(190, 49, 36, 0.1)'
                                }
                              }}
                            >
                              <EditIcon />
                            </IconButton>
                            <IconButton 
                              size="small" 
                              sx={{ 
                                color: '#BE3124',
                                '&:hover': {
                                  bgcolor: 'rgba(190, 49, 36, 0.1)'
                                }
                              }}
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
    </>
  );
}

export default UsersPage; 