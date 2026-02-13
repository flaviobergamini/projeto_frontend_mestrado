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
  Chip,
} from '@mui/material';
import FormInput from '@/app/components/FormInput';
import PageContainer from '@/app/components/PageContainer';

export default function DiaryPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    nomeAluno: '',
    data: new Date().toISOString().split('T')[0],
    turno: '',
    professor: '',

    // Registro do Dia
    atividadesRealizadas: '',
    participacao: '',
    humor: '',

    // Comportamento
    comportamento: '',
    interacoes: '',
    desafiosEnfrentados: '',

    // Aprendizagem
    progressosObservados: '',
    dificuldadesIdentificadas: '',
    estrategiasUtilizadas: '',

    // Comunicação
    formasComunicacao: '',
    efetividadeComunicacao: '',

    // Necessidades e Encaminhamentos
    necessidadesIdentificadas: '',
    acoesFuturas: '',

    observacoesGerais: '',
  });
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (field: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [field]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!formData.nomeAluno || !formData.data || !formData.professor) {
      setError('Preencha todos os campos obrigatórios');
      return;
    }

    // Simulação de salvamento
    const diarios = JSON.parse(localStorage.getItem('diarios') || '[]');
    diarios.push({
      id: Date.now(),
      ...formData,
      dataCriacao: new Date().toISOString(),
    });
    localStorage.setItem('diarios', JSON.stringify(diarios));

    setSuccess(true);
    setTimeout(() => {
      router.push('/menu');
    }, 2000);
  };

  return (
    <PageContainer title="Diário de Acompanhamento" maxWidth="md">
      <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
        Registro diário das atividades, comportamentos e progressos do aluno.
      </Typography>

      <form onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          {/* Identificação */}
          <Grid size={12}>
            <Typography variant="h6" sx={{ mb: 2 }}>
              Identificação
            </Typography>
          </Grid>

          <Grid size={{ xs: 12, sm: 4 }}>
            <FormInput
              label="Nome do Aluno"
              value={formData.nomeAluno}
              onChange={handleChange('nomeAluno')}
              required
            />
          </Grid>

          <Grid size={{ xs: 12, sm: 4 }}>
            <FormInput
              label="Data"
              type="date"
              value={formData.data}
              onChange={handleChange('data')}
              InputLabelProps={{ shrink: true }}
              required
            />
          </Grid>

          <Grid size={{ xs: 12, sm: 4 }}>
            <FormInput
              label="Turno"
              select
              value={formData.turno}
              onChange={handleChange('turno')}
            >
              <MenuItem value="matutino">Matutino</MenuItem>
              <MenuItem value="vespertino">Vespertino</MenuItem>
              <MenuItem value="integral">Integral</MenuItem>
            </FormInput>
          </Grid>

          <Grid size={12}>
            <FormInput
              label="Professor Responsável"
              value={formData.professor}
              onChange={handleChange('professor')}
              required
            />
          </Grid>

          {/* Registro do Dia */}
          <Grid size={12}>
            <Typography variant="h6" sx={{ mt: 2, mb: 2 }}>
              Registro do Dia
            </Typography>
          </Grid>

          <Grid size={12}>
            <FormInput
              label="Atividades Realizadas"
              multiline
              rows={4}
              value={formData.atividadesRealizadas}
              onChange={handleChange('atividadesRealizadas')}
              placeholder="Descreva as atividades realizadas durante o dia..."
            />
          </Grid>

          <Grid size={{ xs: 12, sm: 6 }}>
            <FormInput
              label="Nível de Participação"
              select
              value={formData.participacao}
              onChange={handleChange('participacao')}
            >
              <MenuItem value="excelente">Excelente</MenuItem>
              <MenuItem value="boa">Boa</MenuItem>
              <MenuItem value="regular">Regular</MenuItem>
              <MenuItem value="baixa">Baixa</MenuItem>
              <MenuItem value="nao_participou">Não Participou</MenuItem>
            </FormInput>
          </Grid>

          <Grid size={{ xs: 12, sm: 6 }}>
            <FormInput
              label="Humor/Estado Emocional"
              select
              value={formData.humor}
              onChange={handleChange('humor')}
            >
              <MenuItem value="feliz">Feliz/Animado</MenuItem>
              <MenuItem value="tranquilo">Tranquilo</MenuItem>
              <MenuItem value="ansioso">Ansioso</MenuItem>
              <MenuItem value="irritado">Irritado</MenuItem>
              <MenuItem value="triste">Triste</MenuItem>
            </FormInput>
          </Grid>

          {/* Comportamento */}
          <Grid size={12}>
            <Typography variant="h6" sx={{ mt: 2, mb: 2 }}>
              Comportamento e Interação
            </Typography>
          </Grid>

          <Grid size={12}>
            <FormInput
              label="Comportamento Geral"
              multiline
              rows={3}
              value={formData.comportamento}
              onChange={handleChange('comportamento')}
              placeholder="Descreva o comportamento observado..."
            />
          </Grid>

          <Grid size={12}>
            <FormInput
              label="Interações Sociais"
              multiline
              rows={3}
              value={formData.interacoes}
              onChange={handleChange('interacoes')}
              placeholder="Como foi a interação com colegas e professores..."
            />
          </Grid>

          <Grid size={12}>
            <FormInput
              label="Desafios Enfrentados"
              multiline
              rows={3}
              value={formData.desafiosEnfrentados}
              onChange={handleChange('desafiosEnfrentados')}
              placeholder="Descreva os desafios ou dificuldades do dia..."
            />
          </Grid>

          {/* Aprendizagem */}
          <Grid size={12}>
            <Typography variant="h6" sx={{ mt: 2, mb: 2 }}>
              Aprendizagem
            </Typography>
          </Grid>

          <Grid size={{ xs: 12, sm: 6 }}>
            <FormInput
              label="Progressos Observados"
              multiline
              rows={4}
              value={formData.progressosObservados}
              onChange={handleChange('progressosObservados')}
              placeholder="Progressos e conquistas..."
            />
          </Grid>

          <Grid size={{ xs: 12, sm: 6 }}>
            <FormInput
              label="Dificuldades Identificadas"
              multiline
              rows={4}
              value={formData.dificuldadesIdentificadas}
              onChange={handleChange('dificuldadesIdentificadas')}
              placeholder="Dificuldades acadêmicas..."
            />
          </Grid>

          <Grid size={12}>
            <FormInput
              label="Estratégias Utilizadas"
              multiline
              rows={3}
              value={formData.estrategiasUtilizadas}
              onChange={handleChange('estrategiasUtilizadas')}
              placeholder="Quais estratégias foram aplicadas..."
            />
          </Grid>

          {/* Comunicação */}
          <Grid size={12}>
            <Typography variant="h6" sx={{ mt: 2, mb: 2 }}>
              Comunicação
            </Typography>
          </Grid>

          <Grid size={{ xs: 12, sm: 6 }}>
            <FormInput
              label="Formas de Comunicação"
              multiline
              rows={3}
              value={formData.formasComunicacao}
              onChange={handleChange('formasComunicacao')}
              placeholder="Verbal, gestos, PECS, etc..."
            />
          </Grid>

          <Grid size={{ xs: 12, sm: 6 }}>
            <FormInput
              label="Efetividade da Comunicação"
              select
              value={formData.efetividadeComunicacao}
              onChange={handleChange('efetividadeComunicacao')}
            >
              <MenuItem value="muito_efetiva">Muito Efetiva</MenuItem>
              <MenuItem value="efetiva">Efetiva</MenuItem>
              <MenuItem value="parcialmente">Parcialmente Efetiva</MenuItem>
              <MenuItem value="pouco_efetiva">Pouco Efetiva</MenuItem>
            </FormInput>
          </Grid>

          {/* Necessidades */}
          <Grid size={12}>
            <Typography variant="h6" sx={{ mt: 2, mb: 2 }}>
              Necessidades e Encaminhamentos
            </Typography>
          </Grid>

          <Grid size={12}>
            <FormInput
              label="Necessidades Identificadas"
              multiline
              rows={3}
              value={formData.necessidadesIdentificadas}
              onChange={handleChange('necessidadesIdentificadas')}
              placeholder="Necessidades específicas observadas..."
            />
          </Grid>

          <Grid size={12}>
            <FormInput
              label="Ações Futuras"
              multiline
              rows={3}
              value={formData.acoesFuturas}
              onChange={handleChange('acoesFuturas')}
              placeholder="Ações planejadas para os próximos dias..."
            />
          </Grid>

          <Grid size={12}>
            <FormInput
              label="Observações Gerais"
              multiline
              rows={3}
              value={formData.observacoesGerais}
              onChange={handleChange('observacoesGerais')}
              placeholder="Outras observações relevantes..."
            />
          </Grid>
        </Grid>

        {success && (
          <Alert severity="success" sx={{ mt: 2 }}>
            Registro diário salvo com sucesso!
          </Alert>
        )}

        {error && (
          <Alert severity="error" sx={{ mt: 2 }}>
            {error}
          </Alert>
        )}

        <Box sx={{ mt: 3, display: 'flex', gap: 2 }}>
          <Button type="submit" variant="contained" fullWidth>
            Salvar Registro
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
