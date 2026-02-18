# Serviços da API REST

Este diretório contém todos os serviços para integração com a API REST do projeto.

## Configuração

### 1. Variáveis de Ambiente

Crie um arquivo `.env.local` na raiz do projeto com a URL da API:

```env
NEXT_PUBLIC_BASE_URL=http://localhost:3001
```

### 2. Autenticação

O sistema utiliza **JWT tokens** com dois tipos:
- **Access Token**: Token de curta duração para autenticação das requisições
- **Refresh Token**: Token de longa duração para renovar o access token

Os tokens são gerenciados automaticamente pelo cliente API.

## Uso dos Serviços

### Auth Service

```typescript
import { authService } from '@/lib/services';

// Login
const response = await authService.login({
  email: 'usuario@example.com',
  password: 'senha123'
});

// Registro
const response = await authService.register({
  name: 'João Silva',
  email: 'joao@example.com',
  password: 'senha123'
});

// Logout
authService.logout();

// Verificar autenticação
const isAuth = authService.isAuthenticated();

// Obter usuário atual
const user = authService.getCurrentUser();
```

### PEI Service

```typescript
import { peiService } from '@/lib/services';

// Gerar PEI
const pei = await peiService.generate({
  studentId: '123',
  caseStudyId: '456',
  goals: ['Objetivo 1', 'Objetivo 2'],
  strategies: ['Estratégia 1', 'Estratégia 2']
});

// Gerar PDF do PEI
const pdf = await peiService.generatePDF({
  peiId: pei.id
});

// Download do PDF
await peiService.downloadPDF(pei.id);
```

### Institution Service

```typescript
import { institutionService } from '@/lib/services';

// Criar instituição
const institution = await institutionService.create({
  name: 'Escola Municipal XYZ',
  type: 'Escola Pública',
  address: 'Rua ABC, 123',
  city: 'São Paulo',
  state: 'SP',
  zipCode: '01234-567',
  phone: '(11) 1234-5678',
  email: 'contato@escolaxyz.com'
});
```

### Case Study Service

```typescript
import { caseStudyService } from '@/lib/services';

// Criar estudo de caso
const caseStudy = await caseStudyService.create({
  studentName: 'Maria Silva',
  studentAge: 8,
  institutionId: '123',
  diagnosis: 'Autismo nível 1',
  observations: 'Observações gerais...',
  strengths: ['Boa memória', 'Interesse em números'],
  challenges: ['Interação social', 'Comunicação verbal']
});
```

### Diary Service

```typescript
import { diaryService } from '@/lib/services';

// Criar entrada no diário
const diary = await diaryService.create({
  caseStudyId: '123',
  date: '2024-03-20',
  activities: 'Atividades realizadas hoje...',
  observations: 'Observações do dia...',
  progress: 'Progressos observados...',
  challenges: 'Desafios enfrentados...',
  attachments: ['url-arquivo-1', 'url-arquivo-2']
});
```

## Tratamento de Erros

Todos os serviços lançam `ApiError` em caso de falha:

```typescript
import { ApiError } from '@/lib/api/client';

try {
  await authService.login({ email, password });
} catch (error) {
  if (error instanceof ApiError) {
    console.error(`Erro ${error.status}: ${error.message}`);
    console.error('Dados:', error.data);
  }
}
```

## Cliente API

O cliente API (`lib/api/client.ts`) fornece:

- Gerenciamento automático de tokens
- Refresh automático do access token quando expira (401)
- Helpers para métodos HTTP (GET, POST, PUT, DELETE, PATCH)
- Tratamento de erros padronizado

### Uso direto do cliente API

```typescript
import { api } from '@/lib/api/client';

// GET
const data = await api.get('/endpoint');

// POST
const result = await api.post('/endpoint', { campo: 'valor' });

// PUT
await api.put('/endpoint/123', { campo: 'novo valor' });

// DELETE
await api.delete('/endpoint/123');

// Requisição sem autenticação
const public = await api.get('/public', { requiresAuth: false });
```

## Rotas da API

| Rota | Método | Descrição |
|------|--------|-----------|
| `/auth/login` | POST | Login de usuário |
| `/auth/register` | POST | Registro de novo usuário |
| `/auth/refresh-token` | POST | Renovar access token |
| `/pei/generate` | POST | Gerar novo PEI |
| `/pei/generate-pdf` | POST | Gerar PDF do PEI |
| `/instituition/create` | POST | Criar instituição/escola |
| `/case-study/create` | POST | Criar estudo de caso |
| `/diary/create` | POST | Criar entrada no diário |

## Segurança

- Tokens são armazenados em `localStorage`
- Access token é enviado no header `Authorization: Bearer <token>`
- Refresh token automático em caso de expiração
- Logout automático se refresh falhar
- Redirecionamento para `/login` se não autenticado
