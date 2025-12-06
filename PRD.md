# PRD - Wisedit Docs

## 📋 O que é isso?

Um site de documentação simples e bonito para o Wisedit, parecido com a [documentação do Discord](https://discord.com/developers/docs/intro).

**Nome:** Wisedit Docs
**Site:** wisedit-docs.polelove.art
**Status:** ✅ Em produção

---

## 🎯 O que o site faz?

1. Mostra a documentação de forma organizada
2. Tem uma busca rápida para encontrar qualquer coisa
3. Atualiza sozinho quando você faz mudanças
4. Funciona no celular e computador

---

## 🛠️ Ferramentas que vamos usar

**Para criar o site:**
- Astro - cria o site
- Arquivos .mdx - onde você escreve a documentação
- Pagefind - busca automática
- Tema claro e escuro

**Para organizar:**
- GitHub - salva o código
- Cloudflare - coloca o site no ar
- Docker - roda tudo no seu computador

**Seu computador:**
- Máximo 2GB de memória usada
- Máximo 5GB de espaço em disco
- Deixa 70% do PC livre para outras coisas

---

## 📁 Como ficam os arquivos

```
wisedit-docs/
├── src/
│   ├── content/
│   │   └── docs/           ← Suas documentações aqui
│   │       ├── intro.mdx
│   │       └── guia.mdx
│   └── assets/
│       ├── images/         ← Suas imagens aqui
│       └── gifs/           ← Seus GIFs aqui
├── public/                 ← Arquivos que não mudam
└── AI_INSTRUCTIONS.md      ← Instruções para a IA
```

---

## 📝 Como escrever documentação

Você vai editar arquivos .mdx direto no VSCode. É simples:

```mdx
---
title: "Nome da Página"
description: "Descrição curta"
---

# Título Principal

Seu texto aqui. Pode usar:
- Listas
- **Negrito**
- `código`
- Imagens: ![descrição](./imagem.png)
```

---

## 🔄 Como funciona o trabalho

Temos 3 "versões" do site:

1. **dev** - onde você trabalha (seu computador)
2. **staging** - onde você testa antes de publicar
3. **main** - o site real na internet

**Passo a passo:**
1. Você trabalha no `dev`
2. Quando estiver bom, manda pro `staging` para testar
3. Se tudo OK, manda pro `main` e o site atualiza sozinho em 3 minutos

---

## 🚀 Como o site vai pro ar

**Automático (já configurado):**
```
Você faz: git push origin main
         ↓
GitHub percebe
         ↓
Cria o site
         ↓
Publica no Cloudflare
         ↓
Site atualizado em wisedit-docs.polelove.art
```

Simples assim! Você não precisa fazer nada além do `git push`.

---

## ✨ O que o site tem

- ✅ Busca rápida
- ✅ Tema claro e escuro
- ✅ Funciona em celular
- ✅ Imagens e GIFs
- ✅ Atualiza sozinho

---

## 🎨 Como vai ficar

**Inspiração:**
- [Discord Docs](https://discord.com/developers/docs/intro)
- [Astro Docs](https://docs.astro.build)

**Características:**
- Menu lateral
- Busca em destaque
- Código colorido
- Design limpo

---

## 📊 Como saber se está bom

- ✅ Site carrega rápido (menos de 2 segundos)
- ✅ Busca responde rápido (meio segundo)
- ✅ Publicação rápida (3 minutos)
- ✅ Busca encontra tudo

---

## 🔮 Melhorias futuras

Coisas que podemos adicionar depois:
- Editor visual (Tina CMS)
- Comentários nas páginas
- Estatísticas de acesso
- Múltiplas versões da documentação
- Tradução para outros idiomas

---

**Última atualização:** 2025-12-06
