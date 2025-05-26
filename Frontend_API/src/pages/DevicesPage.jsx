import '../styles/DashboardPage.css';
import ResponsiveAppBar from '../components/dashboard/ResponsiveAppBar';
import SidebarVertical from '../components/dashboard/SidebarVertical';
import NewDeviceDialog from '../components/devices/NewDeviceDialog';
import EditDeviceDialog from '../components/devices/EditDeviceDialog';
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
  CircularProgress
} from '@mui/material';
import { 
  Devices as DevicesIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  Add as AddIcon
} from '@mui/icons-material';
import { useState, useEffect } from 'react';
import axios from 'axios';

function DevicesPage() {
  const [devices, setDevices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [newDeviceDialog, setNewDeviceDialog] = useState({
    open: false,
    nome: '',
    descricao: '',
    tipo: '',
    estado: ''
  });
  const [editDeviceDialog, setEditDeviceDialog] = useState({
    open: false,
    id: null,
    nome: '',
    descricao: '',
    tipo: '',
    estado: ''
  });

  const fetchDevices = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem('token');
      
      console.log('Token:', token);

      const response = await axios.get('http://127.0.0.1:8000/api/item/', {
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization': `Token ${token}`
        }
      });

      console.log('Resposta da API:', response.data);
      
      // Verifica se a resposta tem a propriedade results (paginação) ou é um array direto
      const devicesData = response.data.results || response.data;
      
      if (Array.isArray(devicesData)) {
        console.log('Dispositivos encontrados:', devicesData);
        setDevices(devicesData);
        setError(null);
      } else {
        console.error('Formato de resposta inválido:', response.data);
        setError('Formato de resposta inválido');
      }
    } catch (err) {
      console.error('Erro ao carregar dispositivos:', err);
      if (err.response) {
        console.error('Status:', err.response.status);
        console.error('Dados:', err.response.data);
      }
      setError('Erro ao carregar dispositivos. Por favor, tente novamente.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDevices();
  }, []);

  const handleNewDeviceClick = () => {
    setNewDeviceDialog({
      open: true,
      nome: '',
      descricao: '',
      tipo: '',
      estado: ''
    });
  };

  const handleNewDeviceSubmit = async () => {
    try {
      const token = localStorage.getItem('token');
      
      // Verifica se o token existe
      if (!token) {
        console.error('Token não encontrado');
        setError('Token de autenticação não encontrado');
        return;
      }

      // Verifica se todos os campos obrigatórios estão preenchidos
      if (!newDeviceDialog.nome || !newDeviceDialog.tipo || !newDeviceDialog.estado) {
        console.error('Campos obrigatórios não preenchidos');
        setError('Por favor, preencha todos os campos obrigatórios');
        return;
      }

      const deviceData = {
        nome: newDeviceDialog.nome,
        descricao: newDeviceDialog.descricao || '',
        tipo: newDeviceDialog.tipo,
        estado: newDeviceDialog.estado
      };

      console.log('Dados do dispositivo a ser criado:', deviceData);
      
      const options = {
        method: 'POST',
        url: 'http://127.0.0.1:8000/api/item/',
        headers: {
          'Content-Type': 'application/json',
          'User-Agent': 'insomnia/11.1.0',
          'Authorization': `Token ${token}`
        },
        data: deviceData
      };

      console.log('Opções da requisição:', options);

      const response = await axios.request(options);
      console.log('Resposta da API:', response.data);
      
      if (response.data) {
        console.log('Dispositivo criado com sucesso');
        // Atualiza a lista de dispositivos
        setDevices(prevDevices => [...prevDevices, response.data]);
        
        // Fecha o diálogo e limpa os campos
        setNewDeviceDialog({
          open: false,
          nome: '',
          descricao: '',
          tipo: '',
          estado: ''
        });
        
        setError(null);
      } else {
        throw new Error('Resposta da API não contém dados do dispositivo');
      }
    } catch (error) {
      console.error('Erro ao criar dispositivo:', error);
      if (error.response) {
        console.error('Status:', error.response.status);
        console.error('Dados:', error.response.data);
        setError(error.response.data?.message || 'Erro ao criar dispositivo');
      } else {
        setError('Erro ao criar dispositivo. Por favor, tente novamente.');
      }
    }
  };

  const handleEditClick = (device) => {
    setEditDeviceDialog({
      open: true,
      id: device.id,
      nome: device.nome || '',
      descricao: device.descricao || '',
      tipo: device.tipo || '',
      estado: device.estado || ''
    });
  };

  const handleEditSubmit = async () => {
    try {
      const token = localStorage.getItem('token');
      
      const options = {
        method: 'POST',
        url: `http://127.0.0.1:8000//api/item/${editDeviceDialog.id}/`,
        headers: {
          'Content-Type': 'application/json',
          'User-Agent': 'insomnia/11.1.0',
          'Authorization': `Token ${token}`
        },
        data: {
          nome: editDeviceDialog.nome,
          descricao: editDeviceDialog.descricao,
          tipo: editDeviceDialog.tipo,
          estado: editDeviceDialog.estado
        }
      };

      console.log('Tentando editar dispositivo:', editDeviceDialog);
      console.log('Opções da requisição:', options);

      const response = await axios.request(options);
      console.log('Resposta da API:', response.data);
      console.log('Dispositivo atualizado com sucesso');
      
      // Atualiza a lista de dispositivos
      setDevices(prevDevices => 
        prevDevices.map(device => 
          device.id === editDeviceDialog.id ? response.data : device
        )
      );
      
      // Fecha o diálogo
      setEditDeviceDialog({
        open: false,
        id: null,
        nome: '',
        descricao: '',
        tipo: '',
        estado: ''
      });
      
      setError(null);
    } catch (error) {
      console.error('Erro ao atualizar dispositivo:', error);
      if (error.response) {
        console.error('Status:', error.response.status);
        console.error('Dados:', error.response.data);
      }
      setError(error.response?.data?.message || 'Erro ao atualizar dispositivo');
    }
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
                    <DevicesIcon sx={{ color: '#BE3124' }} />
                    Gerenciamento de Dispositivos
                  </Typography>

                  <Button 
                    variant="contained" 
                    startIcon={<AddIcon />}
                    onClick={handleNewDeviceClick}
                    sx={{ 
                      bgcolor: '#BE3124',
                      '&:hover': {
                        bgcolor: '#9C291E'
                      }
                    }}
                  >
                    Novo Dispositivo
                  </Button>
                </Box>

                <TableContainer>
                  <Table>
                    <TableHead>
                      <TableRow>
                        <TableCell>ID</TableCell>
                        <TableCell>Nome</TableCell>
                        <TableCell>Descrição</TableCell>
                        <TableCell>Tipo</TableCell>
                        <TableCell>Estado</TableCell>
                        <TableCell>Criado Por</TableCell>
                        <TableCell>Data de Criação</TableCell>
                        <TableCell align="right">Ações</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {devices && devices.length > 0 ? (
                        devices.map((device) => (
                          <TableRow key={device.id}>
                            <TableCell>{device.id}</TableCell>
                            <TableCell>
                              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                                <Avatar sx={{ bgcolor: '#BE3124' }}>
                                  <DevicesIcon />
                                </Avatar>
                                <Typography>{device.nome || 'Sem nome'}</Typography>
                              </Box>
                            </TableCell>
                            <TableCell>{device.descricao || 'Sem descrição'}</TableCell>
                            <TableCell>
                              {device.tipo === 'ferramenta_manual' ? 'Ferramenta Manual' :
                               device.tipo === 'ferramenta_eletrica' ? 'Ferramenta Elétrica' :
                               device.tipo === 'ferramenta_medica' ? 'Ferramenta Médica' : 'Não especificado'}
                            </TableCell>
                            <TableCell>
                              <Typography
                                sx={{
                                  color: device.estado === 'disponivel' ? '#4CAF50' : 
                                         device.estado === 'em_uso' ? '#FF9800' : '#F44336',
                                  fontWeight: 'bold'
                                }}
                              >
                                {device.estado === 'disponivel' ? 'Disponível' :
                                 device.estado === 'em_uso' ? 'Em Uso' : 'Em Manutenção'}
                              </Typography>
                            </TableCell>
                            <TableCell>{device.criado_por || 'Não especificado'}</TableCell>
                            <TableCell>
                              {device.data_criacao ? new Date(device.data_criacao).toLocaleString('pt-BR') : 'Não especificado'}
                            </TableCell>
                            <TableCell align="right">
                              <IconButton 
                                color="primary"
                                size="small"
                                sx={{ mr: 1 }}
                                onClick={() => handleEditClick(device)}
                              >
                                <EditIcon />
                              </IconButton>
                              <IconButton
                                color="error"
                                size="small"
                              >
                                <DeleteIcon />
                              </IconButton>
                            </TableCell>
                          </TableRow>
                        ))
                      ) : (
                        <TableRow>
                          <TableCell colSpan={8} align="center">
                            <Typography color="textSecondary">
                              Nenhum dispositivo encontrado
                            </Typography>
                          </TableCell>
                        </TableRow>
                      )}
                    </TableBody>
                  </Table>
                </TableContainer>
              </Paper>
            </Grid>
          </Grid>
        </Box>
      </div>
      <NewDeviceDialog
        open={newDeviceDialog.open}
        onClose={() => setNewDeviceDialog(prev => ({ ...prev, open: false }))}
        onSave={handleNewDeviceSubmit}
        deviceData={newDeviceDialog}
        setDeviceData={setNewDeviceDialog}
      />
      <EditDeviceDialog
        open={editDeviceDialog.open}
        onClose={() => setEditDeviceDialog(prev => ({ ...prev, open: false }))}
        onSave={handleEditSubmit}
        deviceData={editDeviceDialog}
        setDeviceData={setEditDeviceDialog}
      />
    </>
  );
}

export default DevicesPage; 