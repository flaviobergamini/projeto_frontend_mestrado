'use client';

import { useRouter } from 'next/navigation';
import {
  Container,
  Box,
  Typography,
  Button,
  Grid,
  Card,
  CardContent,
} from '@mui/material';
import {
  School,
  AutoStories,
  Diversity3,
  TrendingUp,
} from '@mui/icons-material';

export default function Home() {
  const router = useRouter();

  const features = [
    {
      icon: School,
      title: 'Gestão Escolar',
      description: 'Cadastre escolas e gerencie informações institucionais',
    },
    {
      icon: AutoStories,
      title: 'PEI Digital',
      description: 'Crie e acompanhe Planos Educacionais Individualizados',
    },
    {
      icon: Diversity3,
      title: 'Estudos de Caso',
      description: 'Documente e analise casos de alunos com autismo',
    },
    {
      icon: TrendingUp,
      title: 'Acompanhamento Diário',
      description: 'Registre progressos e observações do dia a dia',
    },
  ];

  return (
    <Box
      sx={{
        minHeight: 'calc(100vh - 64px)',
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        py: 8,
      }}
    >
      <Container maxWidth="lg">
        <Box
          sx={{
            textAlign: 'center',
            color: 'white',
            mb: 6,
          }}
        >
          <Typography
            variant="h2"
            component="h1"
            gutterBottom
            sx={{ fontWeight: 700, mb: 2 }}
          >
            Sistema de Apoio à Educação Inclusiva
          </Typography>
          <Typography variant="h5" sx={{ mb: 4, opacity: 0.9 }}>
            Ferramenta completa para professores de apoio de crianças autistas
          </Typography>
          <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center' }}>
            <Button
              variant="contained"
              size="large"
              sx={{
                backgroundColor: 'white',
                color: '#667eea',
                '&:hover': {
                  backgroundColor: '#f5f5f5',
                },
                px: 4,
                py: 1.5,
              }}
              onClick={() => router.push('/cadastro')}
            >
              Começar Agora
            </Button>
            <Button
              variant="outlined"
              size="large"
              sx={{
                borderColor: 'white',
                color: 'white',
                '&:hover': {
                  borderColor: 'white',
                  backgroundColor: 'rgba(255, 255, 255, 0.1)',
                },
                px: 4,
                py: 1.5,
              }}
              onClick={() => router.push('/login')}
            >
              Já tenho conta
            </Button>
          </Box>
        </Box>

        <Grid container spacing={4}>
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <Grid size={{ xs: 12, sm: 6, md: 3 }} key={index}>
                <Card
                  sx={{
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    textAlign: 'center',
                    p: 3,
                    transition: 'transform 0.3s',
                    '&:hover': {
                      transform: 'translateY(-8px)',
                    },
                  }}
                >
                  <Icon
                    sx={{
                      fontSize: 60,
                      color: '#667eea',
                      mb: 2,
                    }}
                  />
                  <CardContent>
                    <Typography variant="h6" gutterBottom>
                      {feature.title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {feature.description}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            );
          })}
        </Grid>

        <Box
          sx={{
            mt: 8,
            p: 4,
            backgroundColor: 'rgba(255, 255, 255, 0.1)',
            borderRadius: 3,
            backdropFilter: 'blur(10px)',
          }}
        >
          <Typography
            variant="h5"
            sx={{ color: 'white', mb: 2, textAlign: 'center' }}
          >
            Sobre o Sistema
          </Typography>
          <Typography
            variant="body1"
            sx={{ color: 'white', opacity: 0.9, textAlign: 'center' }}
          >
            Este sistema foi desenvolvido para auxiliar professores de apoio no
            acompanhamento e desenvolvimento de crianças autistas em ambiente escolar.
            Com ferramentas para registro de estudos de caso, criação de PEIs,
            acompanhamento diário e gestão de informações escolares, facilitamos
            o trabalho pedagógico e a inclusão.
          </Typography>
        </Box>
      </Container>
    </Box>
  );
}
