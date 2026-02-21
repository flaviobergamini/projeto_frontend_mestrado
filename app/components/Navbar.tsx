'use client';

import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  IconButton,
  Menu,
  MenuItem,
} from '@mui/material';
import { AccountCircle, Extension } from '@mui/icons-material';
import { useAuth } from '../context/AuthContext';
import { authService } from '@/lib/services/auth.service';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function Navbar() {
  const { user, logout, isAuthenticated } = useAuth();
  const router = useRouter();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    handleClose();
    logout();
  };

  return (
    <AppBar
      position="static"
      elevation={3}
      sx={{
        borderRadius: 0,
        background: 'linear-gradient(135deg, #1a237e 0%, #1565c0 55%, #0288d1 100%)',
      }}
    >
      <Toolbar sx={{ py: { xs: 0.5, md: 0.75 }, minHeight: { xs: 56, md: 64 } }}>
        <Box
          sx={{ flexGrow: 1, cursor: 'pointer', overflow: 'hidden', display: 'flex', alignItems: 'center' }}
          onClick={() => router.push('/')}
        >
          <Extension
            sx={{
              mr: 1.5,
              fontSize: { xs: 22, md: 28 },
              opacity: 0.92,
              flexShrink: 0,
            }}
          />
          <Box sx={{ display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
            <Typography
              variant="h6"
              component="div"
              noWrap
              sx={{
                fontWeight: 700,
                letterSpacing: 0.3,
                lineHeight: 1.2,
                fontSize: { sm: '1rem', md: '1.2rem' },
                display: { xs: 'none', sm: 'block' },
              }}
            >
              Sistema de Apoio — Educação Inclusiva
            </Typography>
            <Typography
              variant="caption"
              component="div"
              sx={{
                opacity: 0.72,
                letterSpacing: 1.2,
                textTransform: 'uppercase',
                fontSize: '0.58rem',
                display: { xs: 'none', sm: 'block' },
              }}
            >
              Apoio ao Desenvolvimento de Crianças Autistas
            </Typography>
          </Box>
        </Box>

        {isAuthenticated ? (
          <Box>
            <IconButton size="large" onClick={handleMenu} color="inherit">
              <AccountCircle />
            </IconButton>
            <Menu
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={handleClose}
            >
              <MenuItem disabled>
                <Typography variant="body2">{user?.name}</Typography>
              </MenuItem>
              <MenuItem onClick={() => { handleClose(); router.push('/menu'); }}>
                Menu Principal
              </MenuItem>
              <MenuItem onClick={handleLogout}>Sair</MenuItem>
            </Menu>
          </Box>
        ) : (
          <Box sx={{ display: 'flex', gap: { xs: 0, sm: 1 }, flexShrink: 0 }}>
            <Button
              color="inherit"
              size="small"
              onClick={() => router.push('/login')}
              sx={{ fontSize: { xs: '0.78rem', sm: '0.875rem' }, px: { xs: 1, sm: 2 } }}
            >
              Login
            </Button>
            <Button
              color="inherit"
              size="small"
              onClick={() => router.push('/cadastro')}
              sx={{ fontSize: { xs: '0.78rem', sm: '0.875rem' }, px: { xs: 1, sm: 2 } }}
            >
              Cadastrar
            </Button>
          </Box>
        )}
      </Toolbar>

      {/* Faixa neurodiversidade */}
      <Box
        sx={{
          height: 4,
          background:
            'linear-gradient(90deg, #e53935 0%, #f57c00 20%, #fdd835 40%, #43a047 60%, #1e88e5 80%, #8e24aa 100%)',
        }}
      />
    </AppBar>
  );
}
