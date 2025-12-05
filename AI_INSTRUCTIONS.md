# 🤖 Instruções para IA - Wisedit Docs

> **IMPORTANTE:** Sempre leia este arquivo antes de mexer no projeto.  
> **SEMPRE pergunte antes de atualizar este arquivo.**

**Última atualização:** 2025-12-05

---

## 🎯 Princípio #1: SIMPLICIDADE

**Ao trabalhar neste projeto, sempre:**
- Use a solução mais simples que funciona
- Evite adicionar complexidade desnecessária
- Prefira código claro ao invés de "inteligente"
- Pergunte ao usuário antes de adicionar features não solicitadas

**O usuário é leigo - sempre:**
- Use linguagem simples
- Explique termos técnicos quando necessário
- Dê exemplos práticos
- Ofereça comandos prontos para copiar/colar

---

## 📖 O que é este projeto?

**Nome:** Wisedit Docs  
**Objetivo:** Site de documentação simples e bonito  
**Inspiração:** https://discord.com/developers/docs/intro  
**URL:** wisedit-docs.polelove.art

**Filosofia:**
- 100% estático (sem banco de dados)
- Arquivos .mdx editados no VSCode
- Deploy automático ao fazer push
- Busca funciona automaticamente

---

## 📂 Estrutura dos Arquivos

```
wisedit-docs/
├── src/
│   ├── content/
│   │   └── docs/              ← Documentação aqui
│   │       ├── intro.mdx
│   │       └── guia.mdx
│   ├── components/            ← Componentes reutilizáveis
│   ├── layouts/               ← Layouts de página
│   └── assets/                ← Imagens e GIFs
│       ├── images/
│       └── gifs/
├── public/                    ← Arquivos estáticos
├── .github/workflows/         ← Deploy automático
│   └── deploy.yml
├── docker-compose.yml         ← Docker para rodar local
├── astro.config.mjs          ← Configuração do Astro
└── AI_INSTRUCTIONS.md         ← Este arquivo
```

**Regra importante:** Não complique. Se não está listado aqui, provavelmente não precisa.

---

## 🛠️ Ferramentas Usadas

```
Astro      → Cria o site
Pagefind   → Busca automática
MDX        → Arquivos de documentação
GitHub     → Salva o código
Cloudflare → Publica o site
Docker     → OBRIGATÓRIO para rodar local
```

**⚠️ IMPORTANTE:** Docker é OBRIGATÓRIO. Não use npm diretamente.

---

## 🔄 Como Funciona o Trabalho

### 3 Ambientes

```
dev      → Você trabalha aqui (local)
staging  → Testa aqui antes de publicar
main     → Site real (wisedit-docs.polelove.art)
```

### Fluxo Simples

**1. Trabalhar localmente:**
```bash
# Sempre trabalhar em dev
git checkout dev

# Rodar o site (SEMPRE use Docker)
docker-compose up -d

# Fazer mudanças nos arquivos .mdx
# Ver em http://localhost:4321
```

**2. Salvar mudanças:**
```bash
git add .
git commit -m "descrição do que fez"
git push origin dev
```

**3. Testar antes de publicar:**
```bash
git checkout staging
git merge dev
git push origin staging
# Site de teste: staging-wisedit-docs.pages.dev
```

**4. Publicar no site real:**
```bash
git checkout main
git merge staging
git push origin main
# Site atualiza sozinho em ~3 minutos
```

---

## 🚀 Deploy Automático

**Como funciona:**
```
Você faz: git push origin main
         ↓
GitHub percebe
         ↓
Roda o script .github/workflows/deploy.yml
         ↓
Cria o site (npm run build)
         ↓
Indexa a busca (pagefind)
         ↓
Publica no Cloudflare
         ↓
Pronto! (2-3 minutos)
```

**Você não precisa fazer nada** além do `git push`. O resto é automático.

**Se der erro:**
1. Ver logs em: GitHub → Actions
2. Erro comum: dependências desatualizadas
3. Solução: `npm update` e commitar

---

## ⚙️ Comandos Docker (Obrigatórios)

```bash
# Iniciar servidor de desenvolvimento
docker-compose up -d

# Ver logs em tempo real
docker-compose logs -f

# Parar servidor
docker-compose down

# Reconstruir (quando mudar dependências)
docker-compose build --no-cache

# Reiniciar
docker-compose restart
```

### Git básico
```bash
# Ver mudanças
git status

# Salvar mudanças
git add .
git commit -m "o que você fez"
git push

# Mudar de ambiente
git checkout dev      # trabalhar
git checkout staging  # testar
git checkout main     # publicar
```

---

## 📝 Como Escrever Documentação

**Arquivo de exemplo:** `src/content/docs/exemplo.mdx`

```mdx
---
title: "Título da Página"
description: "Descrição curta (aparece no Google)"
---

# Título Principal

Seu texto aqui.

## Subtítulo

Mais texto.

### Listas
- Item 1
- Item 2
- Item 3

### Código
\`\`\`javascript
console.log("Olá!");
\`\`\`

### Imagens
![Descrição da imagem](../../assets/images/foto.png)

### GIFs
![Demo animado](../../assets/gifs/demo.gif)
```

**Regras simples:**
- Sempre coloque `title` e `description` no topo
- Use `#` para títulos (quanto mais `#`, menor o título)
- Imagens ficam em `src/assets/`
- Nomes de arquivo: tudo minúsculo, separado por hífen

---

## 🎨 Componentes (se precisar)

Você pode criar componentes reutilizáveis:

**Arquivo:** `src/components/Alerta.astro`
```astro
---
const { tipo = "info" } = Astro.props;
---

<div class="alerta alerta-{tipo}">
  <slot />
</div>
```

**Usar no .mdx:**
```mdx
import Alerta from '../../components/Alerta.astro';

<Alerta tipo="aviso">
  Texto do alerta aqui
</Alerta>
```

**Regra:** Só crie componentes se for usar mais de 3 vezes.

---

## 🐛 Problemas Comuns

### Busca não funciona
```bash
# Recriar índice
npm run build
# Verificar se criou: ls -la dist/pagefind
```

### Site não atualiza
```bash
# Limpar cache
rm -rf dist/ .astro/
npm run build
```

### Docker não funciona
```bash
# Reconstruir
docker-compose down
docker-compose build --no-cache
docker-compose up -d
```

### Mudanças não aparecem no site publicado
```bash
# Aguardar 5 minutos (cache do Cloudflare)
# Ou limpar cache no dashboard do Cloudflare
```

---

## 📏 Regras de Commit

Use este formato: `tipo: descrição`

**Tipos:**
- `feat:` nova funcionalidade
- `fix:` corrigir bug
- `docs:` mudar documentação
- `style:` formatação, espaços
- `refactor:` melhorar código

**Exemplos:**
```bash
git commit -m "feat: adiciona página de API"
git commit -m "docs: atualiza guia de início"
git commit -m "fix: corrige busca quebrada"
```

---

## 🤖 Instruções Específicas para IA

### Ao receber uma tarefa:

**1. Entenda o pedido**
- Pergunte se algo não estiver claro
- Confirme entendimento antes de começar

**2. Escolha a solução mais simples**
- Não adicione libraries desnecessárias
- Use o que já está instalado quando possível
- Pergunte antes de instalar coisas novas

**3. Explique o que vai fazer**
```
"Vou criar o arquivo X em Y porque Z.
Pode prosseguir?"
```

**4. Dê exemplos práticos**
- Sempre mostre comandos completos
- Use linguagem simples
- Explique o que cada comando faz

**5. Teste mentalmente**
- "Isso funciona sem complicar?"
- "Um leigo consegue entender?"
- "É a forma mais simples?"

### Não faça:
- ❌ Adicionar features não pedidas
- ❌ Complicar o que é simples
- ❌ Usar jargões sem explicar
- ❌ Assumir conhecimento técnico
- ❌ Fazer mudanças sem avisar

### Sempre faça:
- ✅ Pergunte quando em dúvida
- ✅ Explique em linguagem clara
- ✅ Dê comandos prontos
- ✅ Mantenha simples
- ✅ Documente decisões importantes

---

## 📚 Histórico de Decisões

### 2025-12-05 - Início do Projeto

**Decisão:** Usar Astro + arquivos .mdx  
**Por quê:** Simples, rápido, sem banco de dados  
**Impacto:** Site estático, fácil de manter

---

**Decisão:** Pagefind para busca  
**Por quê:** Grátis, funciona offline, automático  
**Impacto:** Busca rápida sem complicação

---

**Decisão:** Deploy automático via GitHub Actions  
**Por quê:** Menos trabalho manual, menos erros  
**Impacto:** Push e pronto, site atualiza sozinho

---

**Decisão:** Homebrew para instalar tudo  
**Por quê:** Simples para usuários Mac/Linux  
**Impacto:** Uma linha instala cada ferramenta

---

**Decisão:** Sem versionamento de docs por enquanto  
**Por quê:** Adicionar depois se precisar  
**Impacto:** Código mais simples agora

---

## 🔄 Como Atualizar Este Arquivo

**SEMPRE pergunte primeiro:**
```
"Posso atualizar AI_INSTRUCTIONS.md?
Mudança: [o que vai mudar]
Motivo: [por que]
Impacto: [o que isso muda]"
```

**Aguarde confirmação antes de atualizar.**

**Quando atualizar:**
- ✅ Nova ferramenta adicionada
- ✅ Mudança importante no fluxo
- ✅ Decisão técnica relevante
- ✅ Novo comando importante

**Quando NÃO atualizar:**
- ❌ Pequenos ajustes de código
- ❌ Correção de typo
- ❌ Mudanças temporárias

---

## 📞 Recursos Úteis

- [Astro Docs](https://docs.astro.build) - documentação do Astro
- [Pagefind](https://pagefind.app) - documentação da busca
- [MDX](https://mdxjs.com/) - como escrever .mdx
- [Cloudflare Pages](https://developers.cloudflare.com/pages/) - onde o site fica

---

**Lembre-se: SIMPLICIDADE SEMPRE! 🎯**
