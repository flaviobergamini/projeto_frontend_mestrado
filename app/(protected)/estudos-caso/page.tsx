'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import {
  Box,
  Typography,
  TextField,
  Button,
  Switch,
  FormControlLabel,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Alert,
  CircularProgress,
  Divider,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import PageContainer from '@/app/components/PageContainer';
import { caseStudyService, Section } from '@/lib/services/case-study.service';
import { ApiError } from '@/lib/api/client';

export default function EstudosCasoPage() {
  const router = useRouter();

  const [sections, setSections] = useState<Section[]>([]);
  const [answers, setAnswers] = useState<Record<string, string | boolean>>({});
  const [beneficiaryId, setBeneficiaryId] = useState('');
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    caseStudyService
      .getQuestions()
      .then((data) => {
        setSections(data.sections);
        const initial: Record<string, string | boolean> = {};
        data.sections.forEach((section) => {
          section.questions.forEach((q) => {
            initial[q.key] = q.type === 'boolean' ? false : '';
          });
        });
        setAnswers(initial);
      })
      .catch(() => setError('Erro ao carregar as perguntas. Tente novamente.'))
      .finally(() => setLoading(false));
  }, []);

  const handleTextChange = (key: string, value: string) => {
    setAnswers((prev) => ({ ...prev, [key]: value }));
  };

  const handleBooleanChange = (key: string, value: boolean) => {
    setAnswers((prev) => ({ ...prev, [key]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!beneficiaryId || isNaN(Number(beneficiaryId)) || Number(beneficiaryId) < 1) {
      setError('Informe um ID de beneficiário válido');
      return;
    }

    setSubmitting(true);
    try {
      await caseStudyService.createCaseStudy(Number(beneficiaryId), sections, answers);
      setSuccess(true);
    } catch (err) {
      if (err instanceof ApiError) {
        setError(err.message);
      } else {
        setError('Erro ao salvar estudo de caso. Tente novamente.');
      }
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="60vh">
        <CircularProgress />
      </Box>
    );
  }

  if (success) {
    return (
      <PageContainer title="Estudo de Caso" maxWidth="md">
        <Alert severity="success" sx={{ mb: 3 }}>
          Estudo de caso salvo com sucesso!
        </Alert>
        <Box sx={{ display: 'flex', gap: 2 }}>
          <Button
            variant="contained"
            onClick={() => {
              setSuccess(false);
              setBeneficiaryId('');
              const reset: Record<string, string | boolean> = {};
              sections.forEach((s) =>
                s.questions.forEach((q) => {
                  reset[q.key] = q.type === 'boolean' ? false : '';
                })
              );
              setAnswers(reset);
            }}
          >
            Novo Estudo de Caso
          </Button>
          <Button variant="outlined" onClick={() => router.push('/menu')}>
            Voltar ao Menu
          </Button>
        </Box>
      </PageContainer>
    );
  }

  return (
    <PageContainer title="Estudo de Caso" maxWidth="md">
      <form onSubmit={handleSubmit}>
        {/* ID do Beneficiário */}
        <Box sx={{ mb: 3 }}>
          <TextField
            label="ID do Beneficiário"
            type="number"
            value={beneficiaryId}
            onChange={(e) => setBeneficiaryId(e.target.value)}
            required
            fullWidth
            inputProps={{ min: 1 }}
            helperText="Informe o ID do aluno/beneficiário"
          />
        </Box>

        <Divider sx={{ mb: 3 }} />

        {/* Seções de perguntas */}
        {sections.map((section, idx) => (
          <Accordion key={idx} defaultExpanded={idx === 0} sx={{ mb: 1 }}>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography fontWeight={600}>{section.section_name}</Typography>
            </AccordionSummary>
            <AccordionDetails>
              {section.questions.map((q, qIdx) => (
                <Box key={q.key}>
                  {qIdx > 0 && <Divider sx={{ my: 2 }} />}
                  <Typography variant="body2" fontWeight={500} sx={{ mb: 1 }}>
                    {q.question}
                  </Typography>

                  {q.type === 'boolean' ? (
                    <FormControlLabel
                      control={
                        <Switch
                          checked={Boolean(answers[q.key])}
                          onChange={(e) => handleBooleanChange(q.key, e.target.checked)}
                          color="primary"
                        />
                      }
                      label={
                        <Typography variant="body2">
                          {answers[q.key] ? 'Sim' : 'Não'}
                        </Typography>
                      }
                    />
                  ) : (
                    <TextField
                      fullWidth
                      multiline
                      minRows={2}
                      value={String(answers[q.key] ?? '')}
                      onChange={(e) => handleTextChange(q.key, e.target.value)}
                      placeholder="Digite sua resposta..."
                      size="small"
                    />
                  )}
                </Box>
              ))}
            </AccordionDetails>
          </Accordion>
        ))}

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
            disabled={submitting}
          >
            {submitting ? 'Salvando...' : 'Salvar Estudo de Caso'}
          </Button>
          <Button
            variant="outlined"
            fullWidth
            onClick={() => router.push('/menu')}
            disabled={submitting}
          >
            Cancelar
          </Button>
        </Box>
      </form>
    </PageContainer>
  );
}
