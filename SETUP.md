# 🚀 Guia de Instalação - Wisedit Docs

Guia simples para instalar tudo que você precisa.

---

## 📋 O que vamos instalar?

1. Homebrew (gerenciador de programas)
2. Node.js (roda o site)
3. Git (salva seu trabalho)
4. Docker (OBRIGATÓRIO - roda tudo isolado)
5. VSCode (editor de código)

**Tempo estimado:** 15-20 minutos

---

## 🍺 Passo 1: Instalar Homebrew

Homebrew vai instalar tudo para você. É como uma "loja de programas" no terminal.

**Abra o Terminal e cole:**

```bash
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
```

Aperte Enter e aguarde. Vai pedir sua senha do Mac.

**Verificar se instalou:**
```bash
brew --version
# Deve mostrar: Homebrew 4.x.x
```

---

## 📦 Passo 2: Instalar Node.js

Node.js é o que faz o site funcionar.

```bash
brew install node@20
```

**Verificar se instalou:**
```bash
node --version
# Deve mostrar: v20.x.x
```

---

## 🔧 Passo 3: Instalar Git

Git salva seu trabalho e manda pro GitHub.

```bash
brew install git
```

**Verificar se instalou:**
```bash
git --version
# Deve mostrar: git version 2.x.x
```

**Configurar seu nome (só fazer uma vez):**
```bash
git config --global user.name "Seu Nome"
git config --global user.email "seu@email.com"
```

---

## 🐳 Passo 4: Instalar Docker (OBRIGATÓRIO)

Docker é OBRIGATÓRIO para este projeto. Não use npm diretamente.

```bash
brew install --cask docker
```

Depois de instalar, abra o Docker Desktop uma vez (procure no Launchpad).

**Verificar se instalou:**
```bash
docker --version
# Deve mostrar: Docker version 24.x.x
```

---

## 💻 Passo 5: Instalar VSCode

VSCode é onde você vai escrever a documentação.

```bash
brew install --cask visual-studio-code
```

Depois de instalar, abra o VSCode uma vez.

**Extensões recomendadas:**
1. Abra o VSCode
2. Clique no ícone de quadradinhos (Extensions) na esquerda
3. Instale:
   - `Astro` (suporte para .astro files)
   - `MDX` (suporte para .mdx files)
   - `Prettier` (formata código automaticamente)

---

## 🎯 Passo 6: Criar o Projeto

Agora vamos criar o projeto do site.

**1. Criar pasta para o projeto:**
```bash
cd ~/Desktop
mkdir wisedit-docs
cd wisedit-docs
```

**2. Criar projeto Astro:**
```bash
npm create astro@latest .
```

Vai perguntar algumas coisas, responda assim:
- `How would you like to start?` → **Empty**
- `Install dependencies?` → **Yes**
- `TypeScript?` → **Yes**
- `How strict?` → **Strict**
- `Initialize git?` → **Yes**

**3. Instalar ferramentas extras:**
```bash
npm install pagefind astro-pagefind @astrojs/mdx --save-dev
```

---

## 📁 Passo 7: Criar Estrutura de Pastas

Vamos organizar onde cada coisa fica.

```bash
# Criar pastas necessárias
mkdir -p src/content/docs
mkdir -p src/assets/images
mkdir -p src/assets/gifs
mkdir -p src/components
mkdir -p src/layouts
mkdir -p .github/workflows
```

---

## ⚙️ Passo 8: Configurar Astro

**1. Abra o arquivo `astro.config.mjs` no VSCode**

Cole isso dentro:

```javascript
import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';

export default defineConfig({
  site: 'https://wisedit-docs.polelove.art',
  integrations: [mdx()],
  markdown: {
    shikiConfig: {
      theme: 'github-dark',
      wrap: true,
    },
  },
});
```

Salve o arquivo (Cmd+S).

---

## 📝 Passo 9: Configurar Conteúdo

**1. Criar arquivo de configuração de conteúdo**

Crie o arquivo: `src/content/config.ts`

Cole isso dentro:

```typescript
import { defineCollection, z } from 'astro:content';

const docsCollection = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string(),
  }),
});

export const collections = {
  docs: docsCollection,
};
```

**2. Criar primeira página de documentação**

Crie o arquivo: `src/content/docs/intro.mdx`

Cole isso dentro:

```mdx
---
title: "Bem-vindo"
description: "Introdução à documentação do Wisedit"
---

# Bem-vindo ao Wisedit!

Esta é a documentação oficial.

## O que você vai encontrar aqui

- Guias de uso
- Exemplos práticos
- Referências da API
```

---

## 🐳 Passo 10: Configurar Docker (Opcional)

Se você instalou o Docker, vamos configurar.

**1. Criar arquivo `Dockerfile`**

Cole isso dentro:

```dockerfile
FROM node:20-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 4321
CMD ["npm", "run", "dev", "--", "--host"]
```

**2. Criar arquivo `docker-compose.yml`**

Cole isso dentro:

```yaml
services:
  wisedit-docs:
    build: .
    container_name: wisedit-docs
    ports:
      - "4321:4321"
    volumes:
      - .:/app
      - /app/node_modules
    command: npm run dev -- --host
    deploy:
      resources:
        limits:
          memory: 2G
```

---

## 🚀 Passo 11: Configurar Deploy Automático

**1. Criar arquivo de deploy**

Crie o arquivo: `.github/workflows/deploy.yml`

Cole isso dentro:

```yaml
name: Deploy to Cloudflare Pages

on:
  push:
    branches:
      - main
      - staging

permissions:
  contents: read
  deployments: write

jobs:
  deploy:
    runs-on: ubuntu-latest

    steps:
      - name: Checkout
        uses: actions/checkout@v4

      - name: Setup Node
        uses: actions/setup-node@v4
        with:
          node-version: '20'

      - name: Install dependencies
        run: |
          rm -rf node_modules package-lock.json
          npm install

      - name: Build
        run: npm run build

      - name: Deploy to Cloudflare Pages
        uses: cloudflare/pages-action@v1
        with:
          apiToken: ${{ secrets.CLOUDFLARE_API_TOKEN }}
          accountId: ${{ secrets.CLOUDFLARE_ACCOUNT_ID }}
          projectName: wisedit-docs
          directory: dist
          gitHubToken: ${{ secrets.GITHUB_TOKEN }}
```

---

## 🌳 Passo 12: Configurar Git

**1. Criar arquivo `.gitignore`**

Cole isso dentro:

```
node_modules/
dist/
.astro/
.env
.env.local
.DS_Store
```

**2. Criar branches**

```bash
# Salvar trabalho inicial
git add .
git commit -m "chore: setup inicial"

# Criar branch dev
git branch dev
git checkout dev

# Criar branch staging
git branch staging
```

---

## ✅ Passo 13: Testar se Funciona

**1. Rodar o site:**

**Sem Docker:**
```bash
npm run dev
```

**Com Docker:**
```bash
docker-compose up -d
```

**2. Abrir no navegador:**

Abra: http://localhost:4321

Você deve ver o site funcionando!

**3. Testar build:**
```bash
npm run build
npm run preview
```

Se tudo aparecer, está funcionando! 🎉

---

## 📤 Passo 14: Subir para GitHub

**1. Criar repositório no GitHub:**
- Ir em: https://github.com/new
- Nome: `wisedit-docs`
- Deixar privado ou público
- Não adicionar README
- Criar repositório

**2. Conectar seu projeto:**

Cole no terminal (substitua SEU-USUARIO):
```bash
git remote add origin https://github.com/SEU-USUARIO/wisedit-docs.git
git push -u origin dev
git push origin staging
git push origin main
```

---

## ☁️ Passo 15: Configurar Cloudflare

**1. Criar conta no Cloudflare:**
- Ir em: https://dash.cloudflare.com/sign-up
- Criar conta gratuita

**2. Criar projeto:**
- Pages → Create project → Connect to Git
- Escolher seu repositório `wisedit-docs`
- Configurações:
  - Build command: `npm run build`
  - Build output: `dist`
- Clicar em "Save and Deploy"

**3. Pegar credenciais:**
- Account ID: está na URL (depois de `/accounts/`)
- API Token: API Tokens → Create Token → "Edit Cloudflare Workers" template

**4. Adicionar no GitHub:**
- Seu repositório → Settings → Secrets → Actions
- Adicionar:
  - `CLOUDFLARE_API_TOKEN` - cole o token
  - `CLOUDFLARE_ACCOUNT_ID` - cole o account ID

---

## 🎊 Pronto!

Agora está tudo instalado e funcionando!

### Comandos que você vai usar no dia a dia:

```bash
# Ver o site rodando
npm run dev

# Salvar seu trabalho
git add .
git commit -m "o que você fez"
git push

# Publicar no site real
git checkout main
git merge dev
git push
```

---

## 🆘 Problemas?

### "command not found: brew"
Instale o Homebrew de novo seguindo o Passo 1.

### "command not found: node"
```bash
brew install node@20
```

### "Port 4321 already in use"
Algo já está usando essa porta. Feche outros programas ou mude a porta.

### Site não aparece
```bash
# Limpar e tentar de novo
rm -rf node_modules
npm install
npm run dev
```

### Docker não funciona
Certifique-se que o Docker Desktop está aberto.

---

## 📚 Próximos Passos

1. ✅ Ler o arquivo `AI_INSTRUCTIONS.md`
2. ✅ Ler o arquivo `PRD.md`
3. ✅ Criar mais páginas em `src/content/docs/`
4. ✅ Adicionar suas imagens
5. ✅ Fazer seu primeiro deploy!

**Divirta-se! 🚀**
