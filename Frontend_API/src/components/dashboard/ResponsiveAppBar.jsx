import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import { useAuth } from '../../contexts/AuthContext';
import { styled } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';

// Estilização personalizada
const StyledAppBar = styled(AppBar)(({ theme }) => ({
  backgroundColor: '#BE3124',
  boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
}));

const StyledToolbar = styled(Toolbar)(({ theme }) => ({
  minHeight: '80px !important',
  padding: '0 24px',
}));

const NavButton = styled(Button)(({ theme }) => ({
  color: 'white',
  fontSize: '1rem',
  fontWeight: 500,
  padding: '8px 16px',
  '&:hover': {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
  },
}));

const UserInfo = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: '12px',
  padding: '8px 16px',
  borderRadius: '8px',
  backgroundColor: 'rgba(255, 255, 255, 0.1)',
}));

const UserName = styled(Typography)(({ theme }) => ({
  color: 'white',
  fontSize: '1rem',
  fontWeight: 500,
}));

const UserStatus = styled(Typography)(({ theme }) => ({
  color: 'rgba(255, 255, 255, 0.8)',
  fontSize: '0.875rem',
}));

const pages = ['Produtos', 'Dispositivos', 'FAQ'];
const settings = ['Meu Perfil', 'Logout'];

function ResponsiveAppBar() {
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleLogout = async () => {
    try {
      await logout();
      handleCloseUserMenu();
      navigate('/login');
    } catch (error) {
      console.error('Erro ao fazer logout:', error);
      // Mesmo com erro, tenta redirecionar
      handleCloseUserMenu();
      navigate('/login');
    }
  };

  return (
    <StyledAppBar position="fixed">
      <Container maxWidth="xl">
        <StyledToolbar disableGutters>
          {/* Menu Mobile */}
          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="menu"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: 'block', md: 'none' },
                '& .MuiPaper-root': {
                  backgroundColor: '#BE3124',
                  color: 'white',
                },
              }}
            >
              {pages.map((page) => (
                <MenuItem key={page} onClick={handleCloseNavMenu}>
                  <Typography textAlign="center">{page}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>

          {/* Menu Desktop */}
          <Box sx={{ 
            flexGrow: 1, 
            display: { xs: 'none', md: 'flex' }, 
            justifyContent: 'center',
            alignItems: 'center'
          }}>
            <Box sx={{ 
              display: 'flex', 
              gap: 2,
              justifyContent: 'center',
              alignItems: 'center'
            }}>
              {pages.map((page) => (
                <NavButton
                  key={page}
                  onClick={handleCloseNavMenu}
                >
                  {page}
                </NavButton>
              ))}
            </Box>
          </Box>
        

          {/* Área do Usuário */}
          <Box sx={{ flexGrow: 0, display: 'flex', alignItems: 'center', gap: 2 }}>
            <UserInfo>
              <UserName>Olá, {user?.username || 'Usuário'}</UserName>
              <UserStatus>Login Aprovado</UserStatus>
            </UserInfo>

            <Tooltip title="Configurações do Perfil">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar 
                  alt={user?.username || 'U'} 
                  src="/static/images/avatar/2.jpg"
                  sx={{ 
                    width: 40, 
                    height: 40,
                    border: '2px solid rgba(255, 255, 255, 0.2)'
                  }}
                />
              </IconButton>
            </Tooltip>

            <Menu
              sx={{
                mt: '45px',
                '& .MuiPaper-root': {
                  backgroundColor: '#BE3124',
                  color: 'white',
                },
              }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {settings.map((setting) => (
                <MenuItem 
                  key={setting} 
                  onClick={setting === 'Logout' ? handleLogout : handleCloseUserMenu}
                  sx={{
                    '&:hover': {
                      backgroundColor: 'rgba(255, 255, 255, 0.1)',
                    },
                  }}
                >
                  <Typography textAlign="center">{setting}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
        </StyledToolbar>
      </Container>
    </StyledAppBar>
  );
}

export default ResponsiveAppBar;
