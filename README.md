# 🚀 Wisedit Docs

Site de documentação oficial do Wisedit, criado com Astro + MDX.

## ✅ O que já está configurado

- ✅ Projeto Astro criado
- ✅ Estrutura de pastas organizada
- ✅ Layouts e componentes base
- ✅ Páginas de exemplo (Introdução e Guia de Início)
- ✅ **Docker configurado e pronto para usar**
- ✅ GitHub Actions para deploy automático
- ✅ Design inspirado no Discord Docs

## 🐳 Como Rodar (Docker - Obrigatório)

Este projeto **REQUER Docker** para rodar. Não use npm diretamente.

### Iniciar o projeto:

```bash
docker-compose up -d
```

### Ver no navegador:

```
http://localhost:4321
```

### Comandos úteis:

```bash
# Ver logs em tempo real
docker-compose logs -f

# Parar o servidor
docker-compose down

# Reconstruir (se mudar dependências)
docker-compose down
docker-compose build --no-cache
docker-compose up -d
```

## 📁 Estrutura do Projeto

```
wisedit-docs/
├── src/
│   ├── content/
│   │   └── docs/              ← Suas documentações aqui (.mdx)
│   │       ├── intro.mdx
│   │       └── guia-inicio.mdx
│   ├── layouts/               ← Layouts de página
│   │   ├── BaseLayout.astro
│   │   └── DocsLayout.astro
│   ├── pages/                 ← Rotas do site
│   │   ├── index.astro        ← Página inicial
│   │   └── docs/
│   │       └── [...slug].astro ← Páginas dinâmicas
│   ├── components/            ← Componentes reutilizáveis
│   └── assets/                ← Imagens e GIFs
│       ├── images/
│       └── gifs/
├── public/                    ← Arquivos estáticos
│   └── favicon.svg
├── .github/workflows/         ← GitHub Actions
│   └── deploy.yml             ← Deploy automático
├── astro.config.mjs           ← Configuração do Astro
├── package.json               ← Dependências
├── docker-compose.yml         ← Configuração Docker
├── PRD.md                     ← Documento de requisitos
├── AI_INSTRUCTIONS.md         ← Instruções para IA
└── SETUP.md                   ← Guia de instalação

```

## 📝 Como Adicionar Nova Documentação

1. Crie um arquivo `.mdx` em `src/content/docs/`
2. Adicione o frontmatter:

```mdx
---
title: "Título da Página"
description: "Descrição curta"
---

# Título Principal

Seu conteúdo aqui...
```

3. A página aparecerá automaticamente em `/docs/nome-do-arquivo`

## 🔍 Busca Automática

A busca será adicionada automaticamente ao fazer o build do projeto.

O Pagefind irá indexar todas as páginas automaticamente durante o deploy.

## 🚀 Deploy Automático

Quando você fizer push para as branches `main` ou `staging`, o GitHub Actions automaticamente:

1. Instala as dependências
2. Faz o build do site
3. Indexa a busca
4. Publica no Cloudflare Pages

**Configuração necessária no GitHub:**
- `CLOUDFLARE_API_TOKEN` - Token da API do Cloudflare
- `CLOUDFLARE_ACCOUNT_ID` - ID da sua conta Cloudflare

## 🛠️ Comandos Docker

```bash
# Iniciar servidor de desenvolvimento
docker-compose up -d

# Ver logs em tempo real
docker-compose logs -f

# Parar servidor
docker-compose down

# Reconstruir (quando adicionar dependências)
docker-compose build --no-cache

# Reiniciar tudo
docker-compose restart
```

## 🎨 Personalização

### Cores e Tema

Edite as variáveis CSS em `src/layouts/BaseLayout.astro`:

```css
:root {
  --color-bg: #0d1117;
  --color-text: #c9d1d9;
  --color-primary: #58a6ff;
  --color-border: #30363d;
}
```

### Menu Lateral

Edite o menu em `src/layouts/DocsLayout.astro`:

```html
<nav>
  <ul>
    <li><a href="/docs/intro">Introdução</a></li>
    <li><a href="/docs/guia-inicio">Guia de Início</a></li>
    <!-- Adicione mais links aqui -->
  </ul>
</nav>
```

## 📚 Recursos

- [Astro Docs](https://docs.astro.build)
- [MDX](https://mdxjs.com/)
- [Pagefind](https://pagefind.app)
- [Cloudflare Pages](https://pages.cloudflare.com/)

## 🆘 Problemas Comuns

### Site não carrega

```bash
# Reconstruir containers
docker-compose down
docker-compose build --no-cache
docker-compose up -d
```

### Mudanças não aparecem

```bash
# Reiniciar servidor
docker-compose restart
```

### Docker Desktop não está rodando

```bash
# Abrir Docker Desktop primeiro
open -a Docker

# Aguardar iniciar, depois rodar
docker-compose up -d
```

### Porta 4321 já está em uso

```bash
# Parar todos os containers
docker-compose down

# Verificar se algo está usando a porta
lsof -i :4321

# Ou mudar a porta no docker-compose.yml
# De: "4321:4321"
# Para: "3000:4321"
```

---

**Criado com ❤️ usando Astro**
