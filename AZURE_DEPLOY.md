# Guia de Deploy no Azure App Service - Next.js 16

## Correções Aplicadas

### 1. Workflow do GitHub Actions
- ✅ Corrigido o comando de cópia dos arquivos estáticos (de `mv` para `cp -r`)
- ✅ Removidos parâmetros inválidos do `actions/upload-artifact@v4`
- ✅ Corrigido o path do package no deploy (de `./build/standalone` para `.`)
- ✅ Adicionado cópia do `web.config` e `startup.sh` para o standalone

### 2. Arquivos Criados
- ✅ `web.config` - Configuração para IIS no Windows Azure
- ✅ `startup.sh` - Script de inicialização para o Azure

## Configurações Necessárias no Portal do Azure

### Passo 1: Configurações Gerais
Acesse seu App Service no portal Azure e vá em **Configuration** > **General settings**:

1. **Stack settings**:
   - Stack: `Node`
   - Node version: `22 LTS` (ou superior)

2. **Startup Command**:
   ```
   node server.js
   ```
   OU se estiver usando Linux:
   ```
   bash startup.sh
   ```

### Passo 2: Variáveis de Ambiente
Em **Configuration** > **Application settings**, adicione:

```
NODE_ENV=production
WEBSITE_NODE_DEFAULT_VERSION=22-lts
```

Se você tiver outras variáveis de ambiente (como `NEXT_PUBLIC_API_URL`), adicione-as aqui também.

### Passo 3: Configurações Avançadas (Opcional)

1. **Port Binding** - O Azure automaticamente configura a porta via variável `PORT`
2. **Always On** - Ative em **Configuration** > **General settings** para manter a aplicação sempre ativa
3. **Health Check** - Configure em **Health check** para monitorar a saúde da aplicação

### Passo 4: Logs e Diagnóstico

Para debugar problemas:

1. Vá em **Monitoring** > **Log stream** para ver os logs em tempo real
2. Ou use **Diagnose and solve problems** para análise mais detalhada
3. Ative **Application Logging (Filesystem)** em **App Service logs**

## Estrutura do Deploy

Após o build, a estrutura do deploy será:

```
build/standalone/
├── server.js           # Servidor Node.js do Next.js
├── package.json        # Dependências mínimas
├── node_modules/       # Apenas deps necessárias
├── build/              # Build do Next.js
│   ├── server/         # Componentes server-side
│   └── static/         # Assets estáticos
├── public/             # Arquivos públicos
├── web.config          # Config IIS
└── startup.sh          # Script de inicialização
```

## Comandos de Deploy

O workflow está configurado para fazer deploy automático quando você faz push na branch `main`:

```bash
git add .
git commit -m "Deploy to Azure"
git push origin main
```

## Troubleshooting

### Erro: "Application Error"
- Verifique os logs no **Log stream**
- Confirme que o **Startup Command** está configurado corretamente
- Verifique se todas as variáveis de ambiente necessárias estão configuradas

### Erro: "Cannot find module"
- Verifique se o `npm install` executou corretamente no workflow
- Confirme que o `node_modules` está sendo incluído no artifact

### Página não carrega
- Verifique se o Azure está tentando usar a porta correta
- Confirme que o `web.config` foi copiado corretamente
- Verifique os logs de Application Insights

### Assets estáticos não carregam (CSS/JS)
- Confirme que `build/static` foi copiado para `build/standalone/build/static`
- Verifique se o `public` foi copiado para `build/standalone/public`

## Próximos Passos

1. Faça commit e push das alterações
2. Configure o Azure App Service conforme as instruções acima
3. Monitore o deploy no GitHub Actions
4. Verifique os logs no Azure após o deploy

## Recursos Úteis

- [Documentação Azure App Service](https://docs.microsoft.com/azure/app-service/)
- [Next.js Standalone Output](https://nextjs.org/docs/advanced-features/output-file-tracing)
- [GitHub Actions para Azure](https://github.com/Azure/actions)
