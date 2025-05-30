import { Link } from "react-router-dom";
import { 
  Box, 
  Container, 
  Typography, 
  Button,
  useTheme
} from '@mui/material';
import { 
  Login as LoginIcon,
  PersonAdd as PersonAddIcon
} from '@mui/icons-material';
import '../styles/Home.css';

function Home() {
  const theme = useTheme();

  return (
    <Box>
      {/* Main Content */}
      <Container maxWidth="sm" sx={{ textAlign: 'center' }}>
        <Box sx={{ 
        mb: 1 ,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
        }}>
          <div className="logo-salcomp-redd"></div>
        </Box>
        
        <Box className="welcome-buttons" sx={{ display: 'flex', gap: 3, justifyContent: 'center' }}>
          <Button
            component={Link}
            to="/login"
            variant="contained"
            size="large"
            startIcon={<LoginIcon />}
            className="login-button"
            sx={{
              bgcolor: '#BE3124',
              '&:hover': {
                bgcolor: '#9C291E'
              },
              px: 6,
              py: 2,
              fontSize: '1.1rem'
            }}
          >
            Login
          </Button>
          <Button
            component={Link}
            to="/register"
            variant="outlined"
            size="large"
            startIcon={<PersonAddIcon />}
            className="register-button"
            sx={{
              borderColor: '#BE3124',
              color: '#BE3124',
              '&:hover': {
                borderColor: '#9C291E',
                bgcolor: 'rgba(190, 49, 36, 0.04)'
              },
              px: 6,
              py: 2,
              fontSize: '1.1rem'
            }}
          >
            Cadastrar
          </Button>
        </Box>
      </Container>

      {/* Footer */}
      <Box
        className="footer"
        sx={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          py: 3,
          px: 4,
          background: 'white',
          borderTop: '1px solid #eee'
        }}
      >
        <Container maxWidth="lg">
          <Typography variant="body2" color="text.secondary" align="center">
            © 2025 SALCOMP. Todos os direitos reservados.
          </Typography>
        </Container>
      </Box>
    </Box>
  );
}

export default Home;
