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

export default function EscolasPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    nomeEscola: '',
    tipoEscola: '',
    endereco: '',
    cidade: '',
    estado: '',
    cep: '',
    telefone: '',
    email: '',
    diretor: '',
    coordenadorPedagogico: '',
    numeroAlunos: '',
    numeroProfessoresApoio: '',
    infraestrutura: '',
    recursosDisponiveis: '',
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

    if (!formData.nomeEscola || !formData.cidade || !formData.estado) {
      setError('Preencha todos os campos obrigatórios');
      return;
    }

    // Simulação de salvamento
    const escolas = JSON.parse(localStorage.getItem('escolas') || '[]');
    escolas.push({
      id: Date.now(),
      ...formData,
      dataCriacao: new Date().toISOString(),
    });
    localStorage.setItem('escolas', JSON.stringify(escolas));

    setSuccess(true);
    setTimeout(() => {
      router.push('/menu');
    }, 2000);
  };

  return (
    <PageContainer title="Cadastro de Escola" maxWidth="md">
      <form onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          <Grid size={{ xs: 12, sm: 8 }}>
            <FormInput
              label="Nome da Escola"
              value={formData.nomeEscola}
              onChange={handleChange('nomeEscola')}
              required
            />
          </Grid>

          <Grid size={{ xs: 12, sm: 4 }}>
            <FormInput
              label="Tipo de Escola"
              select
              value={formData.tipoEscola}
              onChange={handleChange('tipoEscola')}
            >
              <MenuItem value="publica">Pública</MenuItem>
              <MenuItem value="privada">Privada</MenuItem>
              <MenuItem value="especial">Especial</MenuItem>
            </FormInput>
          </Grid>

          <Grid size={12}>
            <FormInput
              label="Endereço"
              value={formData.endereco}
              onChange={handleChange('endereco')}
            />
          </Grid>

          <Grid size={{ xs: 12, sm: 6 }}>
            <FormInput
              label="Cidade"
              value={formData.cidade}
              onChange={handleChange('cidade')}
              required
            />
          </Grid>

          <Grid size={{ xs: 12, sm: 3 }}>
            <FormInput
              label="Estado"
              value={formData.estado}
              onChange={handleChange('estado')}
              required
              placeholder="UF"
            />
          </Grid>

          <Grid size={{ xs: 12, sm: 3 }}>
            <FormInput
              label="CEP"
              value={formData.cep}
              onChange={handleChange('cep')}
              placeholder="00000-000"
            />
          </Grid>

          <Grid size={{ xs: 12, sm: 6 }}>
            <FormInput
              label="Telefone"
              value={formData.telefone}
              onChange={handleChange('telefone')}
              placeholder="(00) 0000-0000"
            />
          </Grid>

          <Grid size={{ xs: 12, sm: 6 }}>
            <FormInput
              label="Email"
              type="email"
              value={formData.email}
              onChange={handleChange('email')}
            />
          </Grid>

          <Grid size={{ xs: 12, sm: 6 }}>
            <FormInput
              label="Diretor(a)"
              value={formData.diretor}
              onChange={handleChange('diretor')}
            />
          </Grid>

          <Grid size={{ xs: 12, sm: 6 }}>
            <FormInput
              label="Coordenador(a) Pedagógico(a)"
              value={formData.coordenadorPedagogico}
              onChange={handleChange('coordenadorPedagogico')}
            />
          </Grid>

          <Grid size={{ xs: 12, sm: 6 }}>
            <FormInput
              label="Número de Alunos"
              type="number"
              value={formData.numeroAlunos}
              onChange={handleChange('numeroAlunos')}
            />
          </Grid>

          <Grid size={{ xs: 12, sm: 6 }}>
            <FormInput
              label="Professores de Apoio"
              type="number"
              value={formData.numeroProfessoresApoio}
              onChange={handleChange('numeroProfessoresApoio')}
            />
          </Grid>

          <Grid size={12}>
            <FormInput
              label="Infraestrutura"
              multiline
              rows={3}
              value={formData.infraestrutura}
              onChange={handleChange('infraestrutura')}
              placeholder="Descreva a infraestrutura da escola..."
            />
          </Grid>

          <Grid size={12}>
            <FormInput
              label="Recursos Disponíveis"
              multiline
              rows={3}
              value={formData.recursosDisponiveis}
              onChange={handleChange('recursosDisponiveis')}
              placeholder="Descreva os recursos disponíveis para educação inclusiva..."
            />
          </Grid>

          <Grid size={{ xs: 12 }}>
            <FormInput
              label="Observações"
              multiline
              rows={2}
              value={formData.observacoes}
              onChange={handleChange('observacoes')}
            />
          </Grid>
        </Grid>

        {success && (
          <Alert severity="success" sx={{ mt: 2 }}>
            Escola cadastrada com sucesso!
          </Alert>
        )}

        {error && (
          <Alert severity="error" sx={{ mt: 2 }}>
            {error}
          </Alert>
        )}

        <Box sx={{ mt: 3, display: 'flex', gap: 2 }}>
          <Button type="submit" variant="contained" fullWidth>
            Salvar Escola
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
