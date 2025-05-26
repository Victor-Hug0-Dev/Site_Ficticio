import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Box,
  MenuItem
} from '@mui/material';

function EditDeviceDialog({ open, onClose, onSave, deviceData, setDeviceData }) {
  const handleChange = (e) => {
    const { name, value } = e.target;
    setDeviceData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>Editar Dispositivo</DialogTitle>
      <DialogContent>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, pt: 2 }}>
          <TextField
            name="nome"
            label="Nome"
            value={deviceData.nome || ''}
            onChange={handleChange}
            fullWidth
            required
          />
          <TextField
            name="descricao"
            label="Descrição"
            value={deviceData.descricao || ''}
            onChange={handleChange}
            fullWidth
            multiline
            rows={3}
          />
          <TextField
            name="tipo"
            label="Tipo"
            value={deviceData.tipo || ''}
            onChange={handleChange}
            select
            fullWidth
            required
          >
            <MenuItem value="ferramenta_manual">Ferramenta Manual</MenuItem>
            <MenuItem value="ferramenta_eletrica">Ferramenta Elétrica</MenuItem>
            <MenuItem value="ferramenta_medica">Ferramenta Médica</MenuItem>
          </TextField>
          <TextField
            name="estado"
            label="Estado"
            value={deviceData.estado || ''}
            onChange={handleChange}
            select
            fullWidth
            required
          >
            <MenuItem value="disponivel">Disponível</MenuItem>
            <MenuItem value="em_uso">Em Uso</MenuItem>
            <MenuItem value="manutencao">Em Manutenção</MenuItem>
          </TextField>
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancelar</Button>
        <Button 
          onClick={onSave} 
          variant="contained" 
          color="primary"
          disabled={!deviceData.nome || !deviceData.tipo || !deviceData.estado}
        >
          Salvar
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default EditDeviceDialog; 