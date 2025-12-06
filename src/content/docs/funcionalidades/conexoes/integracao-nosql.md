---
title: Integração NoSQL
description: Guia completo sobre como configurar e utilizar integrações NoSQL (MongoDB) no sistema Wisedit, incluindo queries JSON, mapeamento de placeholders e campos de retorno.
---

import { Steps } from '@astrojs/starlight/components';

:::caution[Pendente]
Aplicar melhoria para gerar GIFs demonstrativos da documentação.
:::

## O que é a integração NoSQL

A integração NoSQL serve para conectar bancos de dados não-relacionais, como o `MongoDB`, como fonte de dados no sistema. Permite executar queries NoSQL personalizadas usando formato JSON e mapear os resultados retornados para campos do sistema através de apelidos (`@`), facilitando a consulta e utilização de dados armazenados em bancos externos.

## Listagem de integrações NoSQL

Toda integração NoSQL precisa estar dentro de uma conexão de banco de dados inicial.

:::note[Saiba mais]
Consulte o guia [Como criar uma conexão](/conexoes/#adicionar-uma-nova-conexao) antes de prosseguir.
:::

Ao acessar uma conexão de banco de dados MongoDB, estarão listadas todas as integrações daquela conexão. Você pode adicionar uma nova ou inativar integrações já existentes.

## Adicionar uma nova integração NoSQL

Campos marcados com `*` são obrigatórios.

### Etapa 1 - Configuração Geral

#### 1. Nome da Integração *

- **Descrição:** Nome amigável e único para identificar esta integração.
- **Exemplos:** `Busca Produtos por Preço`, `Consulta Pedidos do Mês`, `Relatório de Clientes Ativos`.

#### 2. Situação *

- **Descrição:** Indica se a integração está ativa ou inativa para uso.
- **Tipos:**
  - `Ativo`: a integração poderá ser utilizada nas execuções, opção preenchida por padrão como ativa.
  - `Inativo`: a integração ficará salva, mas não será utilizada.

#### 3. Alerta *

- **Descrição:** Define se o sistema deve emitir notificações em caso de indisponibilidade.
- **Tipos:**
  - `Sim`: o usuário recebe uma notificação no e-mail informando.
  - `Não`: não será notificado sobre indisponibilidades.

#### 4. Descrição

- **Descrição:** Campo opcional para adicionar informações relacionadas à integração que está sendo cadastrada.

#### 5. Avançar

Clique em **Avançar** para seguir para etapa 2.

---

### Etapa 2 - Código NoSQL

Aqui você irá inserir o código JSON da query MongoDB que será executada no banco de dados.

#### 1. Query *

Código JSON estruturado que será executado no banco MongoDB configurado na conexão.

**Estrutura obrigatória:**

```json
{
  "collection": "nome_da_collection",
  "filter": { },
  "projection": { }
}
```

**Exemplo de preenchimento:**

```json
{
  "collection": "produtos",
  "filter": {
    "preco": { 
      "$gte": "@precoMinimo",
      "$lte": "@precoMaximo"
    },
    "categoria": "@categoriaId",
    "ativo": true
  },
  "projection": {
    "nome": 1,
    "preco": 1,
    "categoria": 1,
    "estoque": 1,
    "_id": 0
  }
}
```

:::caution[Observações importantes]
- Não fazer uso de `limit` e `sort` na query
- Use `@` antes do `value` dentro do `filter` para criar parâmetros que serão mapeados com os campos do sistema durante a execução da política
- Os campos em `projection` definem quais dados serão retornados pela query e quais devem ou não serem mapeados com os campos do sistema (`1` = incluir, `0` = excluir)
:::

#### 2. Avançar

Clique em **Avançar** para seguir para etapa 3.

---

### Etapa 3 - Mapeamento de placeholders

Conecte os `placeholders` da consulta aos campos do sistema. Para adicionar apelidos, basta adicionar `@` + nome do placeholder dentro da propriedade `filter` da query NoSQL.

#### 1. Mapeamento dos placeholder de envio

Aqui os parâmetros da query (precedidos por `@`) precisam ser mapeados com os campos existentes no sistema.

**Como funciona:**
- Os parâmetros na sua query (ex.: `@precoMinimo`), aparecerão automaticamente na coluna `placeholder`
- Os `Campo do sistema` serão responsáveis pelo fornecimento dos valores durante a execução da política
- O sistema substituirá automaticamente `@placeholder` pelo valor do campo mapeado

#### 2. Mapeamento do retorno da query

Aqui será necessário fazer o mapeamento dos campos retornados pela query NoSQL com os campos existentes no sistema.

**Como funciona:**
- Os `Campos Retorno` são os campos definidos na seção `projection` da query (use `1` para incluir o campo no retorno e `0` para excluir)
- Os `Campos do Sistema` serão responsáveis por receber e armazenar esses dados retornados dentro da política durante sua execução ou edição

---

## Duplicar Integração

Para agilizar a criação de integrações com configurações semelhantes, a plataforma Wisedit oferece a funcionalidade de duplicar uma integração já existente. Este recurso economiza tempo ao evitar que você precise preencher novamente todas as informações de uma integração.

### Como duplicar uma integração

<Steps>
1. No menu, acesse a listagem de **Conexões** na barra lateral
2. Na lista, acesse a conexão do tipo NoSQL desejada
3. Dentro da listagem de integrações, clique no **ícone de cópia**, localizado ao lado do ícone de edição (lápis)
</Steps>

Ao clicar no ícone, o formulário de **Adicionar nova integração** será aberto, já preenchido com todas as informações da integração original utilizada como referência.

---

## Editar Integração

Após configurar suas integrações, você pode precisar atualizar informações. O processo de edição é simples e direto.

### Como editar uma integração

<Steps>
1. Acesse a tela de **Conexões**
2. Localize na lista a conexão do tipo NoSQL desejada
3. Dentro da conexão, selecione a integração que deseja editar
4. Clique no ícone de edição (formato de lápis)
</Steps>

:::note[Observações]
- Caso seja alterada a query NoSQL, será necessário refazer o mapeamento se houver mudança nos placeholder (`@`)
- Alterações em `collection`, `filter` ou `projection` não afetam o mapeamento existente
- **Em caso de dúvida sobre o preenchimento:** Consulte o tópico [Adicionar uma nova integração NoSQL](#adicionar-uma-nova-integração-nosql) nesta documentação. Os campos e suas regras de preenchimento são os mesmos quando adiciona uma nova integração.
:::