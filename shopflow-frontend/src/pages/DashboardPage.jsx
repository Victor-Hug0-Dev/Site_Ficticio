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
  Button
} from '@mui/material';
import { 
  People as PeopleIcon,
  Devices as DevicesIcon,
  Notifications as NotificationsIcon,
  Warning as WarningIcon,
  TrendingUp as TrendingUpIcon,
  CalendarMonth as CalendarIcon
} from '@mui/icons-material';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';
import dayjs from 'dayjs';
import 'dayjs/locale/pt-br';


function DashboardPage() {
  return (
    <>
      <ResponsiveAppBar />
      <div className="dashboard-layout">
        <SidebarVertical />
        
        <Box sx={{ flexGrow: 1, p: 3, ml: '330px' }}>
          <Grid container spacing={3}>
            {/* Cards de Estatísticas INFO FALSAS*/}
            <Grid item xs={12} md={3}>
              <Card sx={{ height: '100%', bgcolor: '#BE3124', color: 'white', borderRadius: '20px'}}>
                <CardContent>
                  <Stack direction="row" alignItems="center" spacing={2}>
                    <PeopleIcon sx={{ fontSize: 40 }} />
                    <Box>
                      <Typography variant="h4">1,234</Typography>
                      <Typography variant="body2">Usuários Ativos</Typography>
                    </Box>
                  </Stack>
                </CardContent>
              </Card>
            </Grid>

            <Grid item xs={12} md={3}>
              <Card sx={{ height: '100%', bgcolor: '#BE3124', color: 'white', borderRadius: '20px' }}>  
                <CardContent>
                  <Stack direction="row" alignItems="center" spacing={2}>
                    <DevicesIcon sx={{ fontSize: 40 }} />
                    <Box>
                      <Typography variant="h4">567</Typography>
                      <Typography variant="body2">Dispositivos</Typography>
                    </Box>
                  </Stack>
                </CardContent>
              </Card>
            </Grid>

            <Grid item xs={12} md={3}>
              <Card sx={{ height: '100%', bgcolor: '#BE3124', color: 'white', borderRadius: '20px' }}>
                <CardContent>
                  <Stack direction="row" alignItems="center" spacing={2}>
                    <NotificationsIcon sx={{ fontSize: 40 }} />
                    <Box>
                      <Typography variant="h4">23</Typography>
                      <Typography variant="body2">Alertas</Typography>
                    </Box>
                  </Stack>
                </CardContent>
              </Card>
            </Grid>

            <Grid item xs={12} md={3}>
              <Card sx={{ height: '100%', bgcolor: '#BE3124', color: 'white', borderRadius: '20px' }}>
                <CardContent>
                  <Stack direction="row" alignItems="center" spacing={2}>
                    <TrendingUpIcon sx={{ fontSize: 40 }} />
                    <Box>
                      <Typography variant="h4">98%</Typography>
                      <Typography variant="body2">Eficiência</Typography>
                    </Box>
                  </Stack>
                </CardContent>
              </Card>
            </Grid>

            {/* Calendário */}
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
                  <Typography variant="h6" sx={{ 
                    fontWeight: 'bold', 
                    color: '#333',
                    display: 'flex',
                    alignItems: 'center',
                    gap: 1
                  }}>
                    <CalendarIcon sx={{ color: '#BE3124' }} />
                    Calendário
                  </Typography>
                  <Button 
                    variant="outlined" 
                    size="small"
                    sx={{ 
                      borderColor: '#BE3124',
                      color: '#000',
                      '&:hover': {
                        borderColor: '#BE3124',
                        bgcolor: '#eee'
                      }
                    }}
                  >
                    Ver Agenda
                  </Button>
                </Box>
                <Box sx={{ 
                  display: 'flex', 
                  justifyContent: 'center',
                  '& .MuiPaper-root': {
                    boxShadow: 'none',
                    background: 'transparent'
                  },
                  '& .MuiPickersCalendarHeader-root': {
                    marginTop: 2
                  },
                  '& .MuiPickersDay-root': {
                    fontSize: '0.875rem',
                    '&.Mui-selected': {
                      backgroundColor: '#BE3124',
                      color: 'white',
                      '&:hover': {
                        backgroundColor: '#000'
                      }
                    }
                  }
                }}>
                  <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="pt-br">
                    <DateCalendar 
                      value={dayjs()}
                      sx={{
                        width: '100%',
                        maxWidth: '400px',
                        '& .MuiPickersCalendarHeader-root': {
                          marginTop: 2
                        }
                      }}
                    />
                  </LocalizationProvider>
                </Box>
              </Paper>
            </Grid>

            {/* Status do Sistema INFO FALSAS*/}
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
                  <Typography variant="h6" sx={{ 
                    fontWeight: 'bold', 
                    color: '#333',
                    display: 'flex',
                    alignItems: 'center',
                    gap: 1
                  }}>
                    <DevicesIcon sx={{ color: '#BE3124' }} />
                    Status do Sistema
                  </Typography>
                  <Button 
                    variant="outlined" 
                    size="small"
                    sx={{ 
                      borderColor: '#BE3124',
                      color: '#000',
                      '&:hover': {
                        borderColor: '#BE3124',
                        bgcolor: '#eee'
                      }
                    }}
                  >
                    Ver Detalhes
                  </Button>
                </Box>
                <Grid container spacing={3}>
                  <Grid item xs={12} md={3}>
                    <Card sx={{ 
                      height: '100%',
                      background: 'linear-gradient(135deg, #4CAF50 0%, #45a049 100%)',
                      color: 'white',
                      borderRadius: '10px',
                      transition: 'transform 0.3s ease',
                      '&:hover': {
                        transform: 'translateY(-5px)'
                      }
                    }}>
                      <CardContent>
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                          <Box>
                            <Typography variant="h6" sx={{ mb: 1, fontWeight: 'bold' }}>
                              CPU
                            </Typography>
                            <Typography variant="h4" sx={{ mb: 1, fontWeight: 'bold' }}>
                              45%
                            </Typography>
                            <Typography variant="body2" sx={{ opacity: 0.9 }}>
                              Uso Normal
                            </Typography>
                          </Box>
                          <Box sx={{ 
                            width: 60, 
                            height: 60, 
                            borderRadius: '50%',
                            bgcolor: 'rgba(255,255,255,0.2)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center'
                          }}>
                            <TrendingUpIcon sx={{ fontSize: 30 }} />
                          </Box>
                        </Box>
                        <Box sx={{ mt: 2, display: 'flex', alignItems: 'center', gap: 1 }}>
                          <Typography variant="caption" sx={{ opacity: 0.9 }}>
                            Última atualização: 2 min atrás
                          </Typography>
                        </Box>
                      </CardContent>
                    </Card>
                  </Grid>

                  <Grid item xs={12} md={3}>
                    <Card sx={{ 
                      height: '100%',
                      background: 'linear-gradient(135deg, #2196F3 0%, #1976D2 100%)',
                      color: 'white',
                      borderRadius: '10px',
                      transition: 'transform 0.3s ease',
                      '&:hover': {
                        transform: 'translateY(-5px)'
                      }
                    }}>
                      <CardContent>
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                          <Box>
                            <Typography variant="h6" sx={{ mb: 1, fontWeight: 'bold' }}>
                              Memória
                            </Typography>
                            <Typography variant="h4" sx={{ mb: 1, fontWeight: 'bold' }}>
                              62%
                            </Typography>
                            <Typography variant="body2" sx={{ opacity: 0.9 }}>
                              Uso Moderado
                            </Typography>
                          </Box>
                          <Box sx={{ 
                            width: 60, 
                            height: 60, 
                            borderRadius: '50%',
                            bgcolor: 'rgba(255,255,255,0.2)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center'
                          }}>
                            <TrendingUpIcon sx={{ fontSize: 30 }} />
                          </Box>
                        </Box>
                        <Box sx={{ mt: 2, display: 'flex', alignItems: 'center', gap: 1 }}>
                          <Typography variant="caption" sx={{ opacity: 0.9 }}>
                            Última atualização: 2 min atrás
                          </Typography>
                        </Box>
                      </CardContent>
                    </Card>
                  </Grid>

                  <Grid item xs={12} md={3}>
                    <Card sx={{ 
                      height: '100%',
                      background: 'linear-gradient(135deg, #FF9800 0%, #F57C00 100%)',
                      color: 'white',
                      borderRadius: '10px',
                      transition: 'transform 0.3s ease',
                      '&:hover': {
                        transform: 'translateY(-5px)'
                      }
                    }}>
                      <CardContent>
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                          <Box>
                            <Typography variant="h6" sx={{ mb: 1, fontWeight: 'bold' }}>
                              Disco
                            </Typography>
                            <Typography variant="h4" sx={{ mb: 1, fontWeight: 'bold' }}>
                              78%
                            </Typography>
                            <Typography variant="body2" sx={{ opacity: 0.9 }}>
                              Atenção
                            </Typography>
                          </Box>
                          <Box sx={{ 
                            width: 60, 
                            height: 60, 
                            borderRadius: '50%',
                            bgcolor: 'rgba(255,255,255,0.2)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center'
                          }}>
                            <WarningIcon sx={{ fontSize: 30 }} />
                          </Box>
                        </Box>
                        <Box sx={{ mt: 2, display: 'flex', alignItems: 'center', gap: 1 }}>
                          <Typography variant="caption" sx={{ opacity: 0.9 }}>
                            Última atualização: 2 min atrás
                          </Typography>
                        </Box>
                      </CardContent>
                    </Card>
                  </Grid>

                  <Grid item xs={12} md={3}>
                    <Card sx={{ 
                      height: '100%',
                      background: 'linear-gradient(135deg, #9C27B0 0%, #7B1FA2 100%)',
                      color: 'white',
                      borderRadius: '10px',
                      transition: 'transform 0.3s ease',
                      '&:hover': {
                        transform: 'translateY(-5px)'
                      }
                    }}>
                      <CardContent>
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                          <Box>
                            <Typography variant="h6" sx={{ mb: 1, fontWeight: 'bold' }}>
                              Rede
                            </Typography>
                            <Typography variant="h4" sx={{ mb: 1, fontWeight: 'bold' }}>
                              92%
                            </Typography>
                            <Typography variant="body2" sx={{ opacity: 0.9 }}>
                              Ótimo
                            </Typography>
                          </Box>
                          <Box sx={{ 
                            width: 60, 
                            height: 60, 
                            borderRadius: '50%',
                            bgcolor: 'rgba(255,255,255,0.2)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center'
                          }}>
                            <TrendingUpIcon sx={{ fontSize: 30 }} />
                          </Box>
                        </Box>
                        <Box sx={{ mt: 2, display: 'flex', alignItems: 'center', gap: 1 }}>
                          <Typography variant="caption" sx={{ opacity: 0.9 }}>
                            Última atualização: 2 min atrás
                          </Typography>
                        </Box>
                      </CardContent>
                    </Card>
                  </Grid>
                </Grid>
              </Paper>
            </Grid>
            
          </Grid>
        </Box>
      </div>
    </>
  );
}

export default DashboardPage;
