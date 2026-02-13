'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button, Alert, Box } from '@mui/material';
import { useAuth } from '@/app/context/AuthContext';
import FormInput from '@/app/components/FormInput';
import PageContainer from '@/app/components/PageContainer';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const { login } = useAuth();
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!email || !password) {
      setError('Preencha todos os campos');
      return;
    }

    setLoading(true);

    const result = await login(email, password);

    if (result.success) {
      router.push('/menu');
    } else {
      setError(result.error || 'Email ou senha inválidos');
    }

    setLoading(false);
  };

  return (
    <PageContainer title="Login" maxWidth="sm">
      <form onSubmit={handleSubmit}>
        <FormInput
          label="Email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <FormInput
          label="Senha"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        {error && (
          <Alert severity="error" sx={{ mt: 2 }}>
            {error}
          </Alert>
        )}

        <Box sx={{ mt: 3, display: 'flex', gap: 2 }}>
          <Button
            type="submit"
            variant="contained"
            fullWidth
            disabled={loading}
          >
            Entrar
          </Button>
          <Button
            variant="outlined"
            fullWidth
            onClick={() => router.push('/cadastro')}
          >
            Cadastrar
          </Button>
        </Box>
      </form>
    </PageContainer>
  );
}
