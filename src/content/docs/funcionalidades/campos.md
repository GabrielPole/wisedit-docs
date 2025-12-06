---
title: Campos
description: Documentação sobre Campos.
---


## O que é a área de Campos?
A área de **Campos** é responsável por centralizar e administrar todos os campos utilizados na plataforma.

Existem dois tipos de campos no sistema:

- **Campos mapeados via integração**: utilizados para receber dados externos, possuem valor imutável durante a execução da política.
- **Campos internos do sistema**: podem ser modificados ao longo da execução de uma política, funcionando como variáveis lógicas ou de controle.

Essa separação garante **controle, rastreabilidade e flexibilidade** no uso de dados durante o processo decisório.

## Listagem de Campos

A listagem de campos pode ser acessada no menu lateral (Sidebar).

Na tela de listagem é possível:

- Filtrar por nome do campo, tipo de dado, categoria e situação (ativo/inativo)
- Adicionar um novo campo
- Editar campos existentes
- Duplicar um campo existente

<!-- TODO: Adicionar imagem campos-listagem.png -->
<!-- ![Tela de listagem de campos](./assets/campos-listagem.png) -->

## Adicionar um novo campo

Para adicionar um novo campo:

1. Acesse o menu lateral e clique em **Campos**
2. Clique no botão **ADICIONAR**
3. Preencha os seguintes campos obrigatórios:
   - Nome do campo
   - Categoria
   - Descrição
   - Situação (por padrão, "Ativo")
   - Tipo de dado (é possível adicionar um ou mais)
4. Clique em **Salvar**

:::note[Sobre tipo de dado]
Um campo pode aceitar múltiplos tipos (ex: "float" e "string"), mas durante a execução da política ou mapeamento em integrações, apenas um tipo será utilizado por vez. Após salvar, **não é possível remover tipos de dado já cadastrados** — apenas adicionar novos.
:::

<!-- TODO: Adicionar imagem campos-adicionar.png -->
<!-- ![Adicionar um novo campo](./assets/campos-adicionar.png) -->

## Editar Campo

Para editar um campo:

1. Localize o campo na tabela
2. Clique no ícone de lápis
3. Altere os campos desejados:
   - Nome do campo
   - Categoria
   - Descrição
   - Situação (Ativo/Inativo)
   - Tipo de Dado (podendo somente adicionar e não remover os existentes)
4. Clique em **Salvar**

<!-- TODO: Adicionar imagem campos-editar.gif -->
<!-- ![Editar um campo existente](./assets/campos-editar.gif) -->

:::caution[Importante]
O sistema não permite a remoção de tipos de dado existentes. Essa medida garante rastreabilidade e estabilidade na execução das políticas que utilizam esse campo.
:::

## Duplicar Campos

Para duplicar um campo:

1. Acesse a listagem de campos na barra lateral
2. Localize o campo desejado
3. Clique no ícone de **duplicar** (ao lado do lápis de edição)
4. Preencha ou edite os seguintes campos:
   - **Nome do campo** (obrigatório um novo nome, diferente do original)
   - Categoria
   - Descrição
   - Situação (Ativo/Inativo)
   - **Tipo de dado** (nesta ação, é possível **remover tipos existentes** e adicionar novos)
5. Clique em **Salvar**

:::tip[Dica]
Diferente da edição, ao duplicar é possível **remover tipos de dados** previamente cadastrados.
:::

<!-- TODO: Adicionar imagem campos-duplicar.gif -->
<!-- ![Duplicar um campo](./assets/campos-duplicar.gif) -->
