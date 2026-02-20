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
        minHeight: 'calc(100vh - 68px)',
        backgroundImage: {
          xs: 'url(/mobile_background.png)',
          md: 'url(/desktop_background.png)',
        },
        backgroundSize: 'cover',
        backgroundPosition: { xs: 'center top', md: 'center' },
        backgroundRepeat: 'no-repeat',
        py: { xs: 3, md: 8 },
        px: { xs: 1.5, sm: 0 },
      }}
    >
      <Container maxWidth="lg">

        {/* Hero */}
        <Box
          sx={{
            textAlign: 'center',
            mb: { xs: 3, md: 6 },
            background: 'rgba(255, 255, 255, 0.88)',
            borderRadius: 3,
            px: { xs: 2.5, sm: 4, md: 6 },
            py: { xs: 3.5, md: 5 },
            backdropFilter: 'blur(8px)',
            boxShadow: '0 4px 24px rgba(21, 101, 192, 0.12)',
            border: '1px solid rgba(255, 255, 255, 0.95)',
          }}
        >
          <Typography
            variant="h2"
            component="h1"
            gutterBottom
            sx={{
              fontWeight: 700,
              mb: 2,
              color: '#1a237e',
              fontSize: { xs: '1.6rem', sm: '2.4rem', md: '3.25rem' },
              lineHeight: { xs: 1.25, md: 1.15 },
            }}
          >
            Sistema de Apoio à Educação Inclusiva
          </Typography>

          <Typography
            variant="h5"
            sx={{
              mb: { xs: 3, md: 4 },
              color: '#1565c0',
              fontSize: { xs: '0.975rem', sm: '1.2rem', md: '1.4rem' },
              lineHeight: 1.5,
            }}
          >
            Ferramenta completa para professores de apoio de crianças autistas
          </Typography>

          <Box
            sx={{
              display: 'flex',
              gap: 2,
              justifyContent: 'center',
              flexDirection: { xs: 'column', sm: 'row' },
              alignItems: 'center',
            }}
          >
            <Button
              variant="contained"
              size="large"
              sx={{
                backgroundColor: '#1565c0',
                color: 'white',
                '&:hover': { backgroundColor: '#1a237e' },
                px: 4,
                py: 1.5,
                width: { xs: '100%', sm: 'auto' },
                fontWeight: 600,
              }}
              onClick={() => router.push('/cadastro')}
            >
              Começar Agora
            </Button>
            <Button
              variant="outlined"
              size="large"
              sx={{
                borderColor: '#1565c0',
                borderWidth: 2,
                color: '#1565c0',
                '&:hover': {
                  borderColor: '#1a237e',
                  borderWidth: 2,
                  backgroundColor: 'rgba(21, 101, 192, 0.06)',
                },
                px: 4,
                py: 1.5,
                width: { xs: '100%', sm: 'auto' },
                fontWeight: 600,
              }}
              onClick={() => router.push('/login')}
            >
              Já tenho conta
            </Button>
          </Box>
        </Box>

        {/* Cards de funcionalidades */}
        <Grid container spacing={{ xs: 2, md: 4 }}>
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
                    p: { xs: 2, md: 3 },
                    background: 'rgba(255, 255, 255, 0.92)',
                    backdropFilter: 'blur(6px)',
                    transition: 'transform 0.3s',
                    '&:hover': {
                      transform: 'translateY(-8px)',
                    },
                  }}
                >
                  <Icon
                    sx={{
                      fontSize: { xs: 48, md: 60 },
                      color: '#1565c0',
                      mb: 2,
                    }}
                  />
                  <CardContent sx={{ p: { xs: 1, md: 2 } }}>
                    <Typography
                      variant="h6"
                      gutterBottom
                      sx={{ color: '#1a237e', fontWeight: 600, fontSize: { xs: '1rem', md: '1.25rem' } }}
                    >
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

        {/* Sobre o Sistema */}
        <Box
          sx={{
            mt: { xs: 3, md: 8 },
            p: { xs: 3, md: 4 },
            background: 'rgba(21, 101, 192, 0.82)',
            borderRadius: 3,
            backdropFilter: 'blur(10px)',
            border: '1px solid rgba(255, 255, 255, 0.2)',
          }}
        >
          <Typography
            variant="h5"
            sx={{
              color: 'white',
              mb: 2,
              textAlign: 'center',
              fontWeight: 600,
              fontSize: { xs: '1.1rem', md: '1.5rem' },
              textShadow: '0 1px 6px rgba(0,0,0,0.25)',
            }}
          >
            Sobre o Sistema
          </Typography>
          <Typography
            variant="body1"
            sx={{
              color: 'rgba(255, 255, 255, 0.95)',
              textAlign: 'center',
              fontSize: { xs: '0.875rem', md: '1rem' },
              lineHeight: 1.75,
            }}
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
