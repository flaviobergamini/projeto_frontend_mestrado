'use client';

import { useRouter } from 'next/navigation';
import {
  Grid,
  Card,
  CardContent,
  CardActions,
  Typography,
  Button,
  Box,
} from '@mui/material';
import {
  School,
  MenuBook,
  Assignment,
  EventNote,
} from '@mui/icons-material';
import PageContainer from '@/app/components/PageContainer';
import { useAuth } from '@/app/context/AuthContext';

const menuItems = [
  {
    title: 'Estudos de Caso',
    description: 'Cadastre e gerencie estudos de caso dos alunos',
    icon: Assignment,
    color: '#1976d2',
    route: '/estudos-caso',
  },
  {
    title: 'Escolas',
    description: 'Cadastre escolas e instituições de ensino',
    icon: School,
    color: '#2e7d32',
    route: '/escolas',
  },
  {
    title: 'PEI',
    description: 'Plano Educacional Individualizado',
    icon: MenuBook,
    color: '#ed6c02',
    route: '/pei',
  },
  {
    title: 'Diário',
    description: 'Registro diário de atividades e observações',
    icon: EventNote,
    color: '#9c27b0',
    route: '/diario',
  },
];

export default function MenuPage() {
  const router = useRouter();
  const { user } = useAuth();

  return (
    <PageContainer title={`Bem-vindo, ${user?.name}!`} maxWidth="lg">
      <Typography variant="body1" sx={{ mb: 4 }}>
        Selecione uma opção abaixo para começar:
      </Typography>

      <Grid container spacing={3}>
        {menuItems.map((item) => {
          const Icon = item.icon;
          return (
            <Grid size={{ xs: 12, sm: 6, md: 6 }} key={item.title}>
              <Card
                sx={{
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  transition: 'transform 0.2s',
                  '&:hover': {
                    transform: 'translateY(-4px)',
                    boxShadow: 4,
                  },
                }}
              >
                <CardContent sx={{ flexGrow: 1 }}>
                  <Box
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      mb: 2,
                    }}
                  >
                    <Icon sx={{ fontSize: 40, color: item.color, mr: 2 }} />
                    <Typography variant="h5" component="h2">
                      {item.title}
                    </Typography>
                  </Box>
                  <Typography variant="body2" color="text.secondary">
                    {item.description}
                  </Typography>
                </CardContent>
                <CardActions>
                  <Button
                    size="large"
                    fullWidth
                    variant="contained"
                    onClick={() => router.push(item.route)}
                    sx={{
                      backgroundColor: item.color,
                      '&:hover': {
                        backgroundColor: item.color,
                        filter: 'brightness(0.9)',
                      },
                    }}
                  >
                    Acessar
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          );
        })}
      </Grid>
    </PageContainer>
  );
}
