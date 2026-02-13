'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import {
  Button,
  Alert,
  Box,
  MenuItem,
  Grid,
  Typography,
  Divider,
} from '@mui/material';
import FormInput from '@/app/components/FormInput';
import PageContainer from '@/app/components/PageContainer';

export default function PEIPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    nomeAluno: '',
    dataElaboracao: '',
    periodoVigencia: '',
    responsavel: '',

    // Objetivos Gerais
    objetivoGeral: '',
    objetivosEspecificos: '',

    // Áreas de Desenvolvimento
    comunicacao: '',
    interacaoSocial: '',
    comportamento: '',
    autonomia: '',
    cognitivo: '',
    motor: '',

    // Estratégias e Recursos
    estrategiasPedagogicas: '',
    recursosMateriaisAdaptacoes: '',
    apoioNecessario: '',

    // Avaliação
    criteriosAvaliacao: '',
    frequenciaAvaliacao: '',

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

    if (!formData.nomeAluno || !formData.dataElaboracao || !formData.responsavel) {
      setError('Preencha todos os campos obrigatórios');
      return;
    }

    // Simulação de salvamento
    const peis = JSON.parse(localStorage.getItem('peis') || '[]');
    peis.push({
      id: Date.now(),
      ...formData,
      dataCriacao: new Date().toISOString(),
    });
    localStorage.setItem('peis', JSON.stringify(peis));

    setSuccess(true);
    setTimeout(() => {
      router.push('/menu');
    }, 2000);
  };

  return (
    <PageContainer title="Plano Educacional Individualizado (PEI)" maxWidth="md">
      <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
        O PEI é um documento que orienta o processo educacional do aluno, definindo objetivos,
        estratégias e recursos necessários para seu desenvolvimento.
      </Typography>

      <form onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          {/* Identificação */}
          <Grid item xs={12}>
            <Typography variant="h6" sx={{ mb: 2 }}>
              Identificação
            </Typography>
          </Grid>

          <Grid item xs={12} sm={6}>
            <FormInput
              label="Nome do Aluno"
              value={formData.nomeAluno}
              onChange={handleChange('nomeAluno')}
              required
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <FormInput
              label="Responsável pelo PEI"
              value={formData.responsavel}
              onChange={handleChange('responsavel')}
              required
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <FormInput
              label="Data de Elaboração"
              type="date"
              value={formData.dataElaboracao}
              onChange={handleChange('dataElaboracao')}
              InputLabelProps={{ shrink: true }}
              required
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <FormInput
              label="Período de Vigência"
              select
              value={formData.periodoVigencia}
              onChange={handleChange('periodoVigencia')}
            >
              <MenuItem value="semestral">Semestral</MenuItem>
              <MenuItem value="anual">Anual</MenuItem>
              <MenuItem value="bimestral">Bimestral</MenuItem>
            </FormInput>
          </Grid>

          {/* Objetivos */}
          <Grid item xs={12}>
            <Divider sx={{ my: 2 }} />
            <Typography variant="h6" sx={{ mb: 2 }}>
              Objetivos
            </Typography>
          </Grid>

          <Grid item xs={12}>
            <FormInput
              label="Objetivo Geral"
              multiline
              rows={3}
              value={formData.objetivoGeral}
              onChange={handleChange('objetivoGeral')}
              placeholder="Descreva o objetivo geral do PEI..."
            />
          </Grid>

          <Grid item xs={12}>
            <FormInput
              label="Objetivos Específicos"
              multiline
              rows={4}
              value={formData.objetivosEspecificos}
              onChange={handleChange('objetivosEspecificos')}
              placeholder="Liste os objetivos específicos por área de desenvolvimento..."
            />
          </Grid>

          {/* Áreas de Desenvolvimento */}
          <Grid item xs={12}>
            <Divider sx={{ my: 2 }} />
            <Typography variant="h6" sx={{ mb: 2 }}>
              Áreas de Desenvolvimento
            </Typography>
          </Grid>

          <Grid item xs={12} sm={6}>
            <FormInput
              label="Comunicação"
              multiline
              rows={3}
              value={formData.comunicacao}
              onChange={handleChange('comunicacao')}
              placeholder="Objetivos e estratégias..."
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <FormInput
              label="Interação Social"
              multiline
              rows={3}
              value={formData.interacaoSocial}
              onChange={handleChange('interacaoSocial')}
              placeholder="Objetivos e estratégias..."
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <FormInput
              label="Comportamento"
              multiline
              rows={3}
              value={formData.comportamento}
              onChange={handleChange('comportamento')}
              placeholder="Objetivos e estratégias..."
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <FormInput
              label="Autonomia"
              multiline
              rows={3}
              value={formData.autonomia}
              onChange={handleChange('autonomia')}
              placeholder="Objetivos e estratégias..."
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <FormInput
              label="Desenvolvimento Cognitivo"
              multiline
              rows={3}
              value={formData.cognitivo}
              onChange={handleChange('cognitivo')}
              placeholder="Objetivos e estratégias..."
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <FormInput
              label="Desenvolvimento Motor"
              multiline
              rows={3}
              value={formData.motor}
              onChange={handleChange('motor')}
              placeholder="Objetivos e estratégias..."
            />
          </Grid>

          {/* Estratégias e Recursos */}
          <Grid item xs={12}>
            <Divider sx={{ my: 2 }} />
            <Typography variant="h6" sx={{ mb: 2 }}>
              Estratégias e Recursos
            </Typography>
          </Grid>

          <Grid item xs={12}>
            <FormInput
              label="Estratégias Pedagógicas"
              multiline
              rows={4}
              value={formData.estrategiasPedagogicas}
              onChange={handleChange('estrategiasPedagogicas')}
              placeholder="Descreva as estratégias pedagógicas a serem utilizadas..."
            />
          </Grid>

          <Grid item xs={12}>
            <FormInput
              label="Recursos Materiais e Adaptações"
              multiline
              rows={3}
              value={formData.recursosMateriaisAdaptacoes}
              onChange={handleChange('recursosMateriaisAdaptacoes')}
              placeholder="Liste os recursos e adaptações necessários..."
            />
          </Grid>

          <Grid item xs={12}>
            <FormInput
              label="Apoio Necessário"
              multiline
              rows={3}
              value={formData.apoioNecessario}
              onChange={handleChange('apoioNecessario')}
              placeholder="Descreva o tipo de apoio necessário (professor, auxiliar, terapeuta, etc.)..."
            />
          </Grid>

          {/* Avaliação */}
          <Grid item xs={12}>
            <Divider sx={{ my: 2 }} />
            <Typography variant="h6" sx={{ mb: 2 }}>
              Avaliação
            </Typography>
          </Grid>

          <Grid item xs={12} sm={6}>
            <FormInput
              label="Critérios de Avaliação"
              multiline
              rows={3}
              value={formData.criteriosAvaliacao}
              onChange={handleChange('criteriosAvaliacao')}
              placeholder="Como o progresso será avaliado..."
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <FormInput
              label="Frequência de Avaliação"
              select
              value={formData.frequenciaAvaliacao}
              onChange={handleChange('frequenciaAvaliacao')}
            >
              <MenuItem value="semanal">Semanal</MenuItem>
              <MenuItem value="quinzenal">Quinzenal</MenuItem>
              <MenuItem value="mensal">Mensal</MenuItem>
              <MenuItem value="bimestral">Bimestral</MenuItem>
            </FormInput>
          </Grid>

          <Grid item xs={12}>
            <FormInput
              label="Observações Gerais"
              multiline
              rows={3}
              value={formData.observacoes}
              onChange={handleChange('observacoes')}
            />
          </Grid>
        </Grid>

        {success && (
          <Alert severity="success" sx={{ mt: 2 }}>
            PEI cadastrado com sucesso!
          </Alert>
        )}

        {error && (
          <Alert severity="error" sx={{ mt: 2 }}>
            {error}
          </Alert>
        )}

        <Box sx={{ mt: 3, display: 'flex', gap: 2 }}>
          <Button type="submit" variant="contained" fullWidth>
            Salvar PEI
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
