'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button, Alert, Box } from '@mui/material';
import { useAuth } from '@/app/context/AuthContext';
import FormInput from '@/app/components/FormInput';
import PageContainer from '@/app/components/PageContainer';

export default function CadastroPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const { register } = useAuth();
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!name || !email || !password || !confirmPassword) {
      setError('Preencha todos os campos');
      return;
    }

    if (password !== confirmPassword) {
      setError('As senhas não coincidem');
      return;
    }

    if (password.length < 6) {
      setError('A senha deve ter no mínimo 6 caracteres');
      return;
    }

    setLoading(true);

    const result = await register(name, email, password);

    if (result.success) {
      router.push('/login');
    } else {
      setError(result.error || 'Erro ao cadastrar usuário');
    }

    setLoading(false);
  };

  return (
    <PageContainer title="Cadastro de Usuário" maxWidth="sm">
      <form onSubmit={handleSubmit}>
        <FormInput
          label="Nome Completo"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />

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

        <FormInput
          label="Confirmar Senha"
          type="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
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
            Cadastrar
          </Button>
          <Button
            variant="outlined"
            fullWidth
            onClick={() => router.push('/login')}
          >
            Já tenho conta
          </Button>
        </Box>
      </form>
    </PageContainer>
  );
}
