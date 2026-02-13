'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import {
  Button,
  Alert,
  Box,
  MenuItem,
  Grid,
} from '@mui/material';
import FormInput from '@/app/components/FormInput';
import PageContainer from '@/app/components/PageContainer';

export default function EstudosCasoPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    nomeAluno: '',
    idade: '',
    dataAvaliacao: '',
    diagnostico: '',
    nivelAutismo: '',
    comportamentos: '',
    habilidades: '',
    necessidades: '',
    estrategias: '',
    observacoes: '',
  });
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (field: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [field]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!formData.nomeAluno || !formData.idade || !formData.dataAvaliacao) {
      setError('Preencha todos os campos obrigatórios');
      return;
    }

    // Simulação de salvamento
    const estudos = JSON.parse(localStorage.getItem('estudos-caso') || '[]');
    estudos.push({
      id: Date.now(),
      ...formData,
      dataCriacao: new Date().toISOString(),
    });
    localStorage.setItem('estudos-caso', JSON.stringify(estudos));

    setSuccess(true);
    setTimeout(() => {
      router.push('/menu');
    }, 2000);
  };

  return (
    <PageContainer title="Cadastro de Estudo de Caso" maxWidth="md">
      <form onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          <Grid size={{ xs: 12, sm: 8 }}>
            <FormInput
              label="Nome do Aluno"
              value={formData.nomeAluno}
              onChange={handleChange('nomeAluno')}
              required
            />
          </Grid>

          <Grid size={{ xs: 12, sm: 4 }}>
            <FormInput
              label="Idade"
              type="number"
              value={formData.idade}
              onChange={handleChange('idade')}
              required
            />
          </Grid>

          <Grid size={{ xs: 12, sm: 6 }}>
            <FormInput
              label="Data da Avaliação"
              type="date"
              value={formData.dataAvaliacao}
              onChange={handleChange('dataAvaliacao')}
              InputLabelProps={{ shrink: true }}
              required
            />
          </Grid>

          <Grid size={{ xs: 12, sm: 6 }}>
            <FormInput
              label="Nível do Autismo"
              select
              value={formData.nivelAutismo}
              onChange={handleChange('nivelAutismo')}
            >
              <MenuItem value="leve">Leve (Nível 1)</MenuItem>
              <MenuItem value="moderado">Moderado (Nível 2)</MenuItem>
              <MenuItem value="severo">Severo (Nível 3)</MenuItem>
            </FormInput>
          </Grid>

          <Grid size={12}>
            <FormInput
              label="Diagnóstico"
              multiline
              rows={2}
              value={formData.diagnostico}
              onChange={handleChange('diagnostico')}
            />
          </Grid>

          <Grid size={12}>
            <FormInput
              label="Comportamentos Observados"
              multiline
              rows={3}
              value={formData.comportamentos}
              onChange={handleChange('comportamentos')}
              placeholder="Descreva os comportamentos observados..."
            />
          </Grid>

          <Grid size={12}>
            <FormInput
              label="Habilidades e Pontos Fortes"
              multiline
              rows={3}
              value={formData.habilidades}
              onChange={handleChange('habilidades')}
              placeholder="Descreva as habilidades e pontos fortes..."
            />
          </Grid>

          <Grid size={12}>
            <FormInput
              label="Necessidades Especiais"
              multiline
              rows={3}
              value={formData.necessidades}
              onChange={handleChange('necessidades')}
              placeholder="Descreva as necessidades especiais..."
            />
          </Grid>

          <Grid size={12}>
            <FormInput
              label="Estratégias Recomendadas"
              multiline
              rows={3}
              value={formData.estrategias}
              onChange={handleChange('estrategias')}
              placeholder="Descreva as estratégias de intervenção..."
            />
          </Grid>

          <Grid size={12}>
            <FormInput
              label="Observações Adicionais"
              multiline
              rows={2}
              value={formData.observacoes}
              onChange={handleChange('observacoes')}
            />
          </Grid>
        </Grid>

        {success && (
          <Alert severity="success" sx={{ mt: 2 }}>
            Estudo de caso cadastrado com sucesso!
          </Alert>
        )}

        {error && (
          <Alert severity="error" sx={{ mt: 2 }}>
            {error}
          </Alert>
        )}

        <Box sx={{ mt: 3, display: 'flex', gap: 2 }}>
          <Button type="submit" variant="contained" fullWidth>
            Salvar Estudo de Caso
          </Button>
          <Button
            variant="outlined"
            fullWidth
            onClick={() => router.push('/menu')}
          >
            Cancelar
          </Button>
        </Box>
      </form>
    </PageContainer>
  );
}
