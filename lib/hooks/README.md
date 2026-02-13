# Hooks Customizados

## useApi

Hook para facilitar chamadas à API com gerenciamento automático de estado (loading, error, data).

### Uso

```typescript
import { useApi } from '@/lib/hooks';
import { peiService } from '@/lib/services';

function MyComponent() {
  const { data, loading, error, execute, reset } = useApi(peiService.generate);

  const handleGenerate = async () => {
    const result = await execute({
      studentId: '123',
      caseStudyId: '456',
      goals: ['Objetivo 1'],
      strategies: ['Estratégia 1']
    });

    if (result) {
      console.log('PEI gerado:', result);
    }
  };

  if (loading) return <div>Carregando...</div>;
  if (error) return <div>Erro: {error}</div>;

  return (
    <div>
      <button onClick={handleGenerate}>Gerar PEI</button>
      {data && <div>PEI ID: {data.id}</div>}
      <button onClick={reset}>Limpar</button>
    </div>
  );
}
```

### Retorno

O hook retorna um objeto com:

- **data**: Dados retornados pela API (null inicialmente)
- **loading**: Boolean indicando se a requisição está em andamento
- **error**: Mensagem de erro (null se não houver erro)
- **execute**: Função para executar a chamada à API
- **reset**: Função para resetar o estado do hook

### Exemplo com formulário

```typescript
import { useState } from 'react';
import { useApi } from '@/lib/hooks';
import { caseStudyService } from '@/lib/services';

function CreateCaseStudyForm() {
  const [formData, setFormData] = useState({
    studentName: '',
    studentAge: 0,
    institutionId: ''
  });

  const { loading, error, execute } = useApi(caseStudyService.create);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const result = await execute(formData);

    if (result) {
      alert('Estudo de caso criado com sucesso!');
      // Resetar formulário ou redirecionar
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        value={formData.studentName}
        onChange={(e) => setFormData({ ...formData, studentName: e.target.value })}
        placeholder="Nome do estudante"
      />

      <input
        type="number"
        value={formData.studentAge}
        onChange={(e) => setFormData({ ...formData, studentAge: Number(e.target.value) })}
        placeholder="Idade"
      />

      {error && <div className="error">{error}</div>}

      <button type="submit" disabled={loading}>
        {loading ? 'Criando...' : 'Criar Estudo de Caso'}
      </button>
    </form>
  );
}
```

### Múltiplas chamadas no mesmo componente

```typescript
function MyComponent() {
  const createInstitution = useApi(institutionService.create);
  const createCaseStudy = useApi(caseStudyService.create);

  const handleCreateBoth = async () => {
    // Criar instituição primeiro
    const institution = await createInstitution.execute({
      name: 'Escola XYZ',
      type: 'Pública'
    });

    if (institution) {
      // Depois criar estudo de caso
      const caseStudy = await createCaseStudy.execute({
        studentName: 'João',
        studentAge: 10,
        institutionId: institution.id
      });
    }
  };

  return (
    <div>
      <button onClick={handleCreateBoth}>
        Criar Instituição e Estudo de Caso
      </button>

      {createInstitution.loading && <div>Criando instituição...</div>}
      {createCaseStudy.loading && <div>Criando estudo de caso...</div>}

      {createInstitution.error && <div>Erro: {createInstitution.error}</div>}
      {createCaseStudy.error && <div>Erro: {createCaseStudy.error}</div>}
    </div>
  );
}
```
