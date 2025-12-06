---
title: Integração SQL
description: Guia completo sobre como configurar e utilizar integrações SQL no sistema Wisedit, incluindo queries personalizadas, mapeamento de parâmetros e campos de retorno.
---

import { Steps } from '@astrojs/starlight/components';

:::caution[Pendente]
Aplicar melhoria para gerar GIFs demonstrativos da documentação.
:::

## O que é a integração SQL

A integração SQL serve para conectar bancos de dados relacionais como fonte de dados no sistema. Permite executar queries SQL personalizadas e mapear os resultados retornados para campos do sistema, facilitando a consulta e utilização de dados armazenados em bancos de dados externos.

## Listagem de integrações SQL

Toda integração SQL precisa estar dentro de uma conexão de banco de dados inicial.

:::note[Saiba mais]
Consulte o guia [Como criar uma conexão](/conexoes/#adicionar-uma-nova-conexao) antes de prosseguir.
:::

Ao acessar uma conexão de banco de dados, estarão listadas todas as integrações daquela conexão. Você pode adicionar uma nova ou inativar integrações já existentes.

## Adicionar uma nova integração SQL

Campos marcados com `*` são obrigatórios.

### Etapa 1 - Configuração Geral

#### 1. Nome da Integração *

- **Descrição:** Nome amigável e único para identificar esta integração.
- **Exemplos:** `Consulta Produtos`, `Busca de Clientes por CPF`, `Lista de Pedidos`.

#### 2. Situação *

- **Descrição:** Indica se a integração está ativa ou inativa para uso.
- **Tipos:**
  - `Ativo`: a integração poderá ser utilizada nas execuções, opção preenchida por padrão como ativa.
  - `Inativo`: a integração ficará salva, mas não será utilizada.

#### 3. Alerta *

- **Descrição:** Define se o sistema deve emitir notificações em caso de indisponibilidade.
- **Tipos:**
  - `Sim`: o usuário recebe uma notificação no e-mail informando.
  - `Não`: o usuário não será notificado.

#### 4. Descrição

- **Descrição:** Campo opcional para adicionar informações relacionadas à integração que está sendo cadastrada.

#### 5. Avançar

Clique em **Avançar** para seguir para etapa 2.

---

### Etapa 2 - Código SQL

Aqui você irá inserir ou colar o código SQL que será executado no banco de dados.

#### 1. Query *

Código SQL que será executado no banco de dados configurado na conexão.

**Exemplo:**

```sql
SELECT 
  p.nome AS nome_cliente, 
  p.idade AS idade_cliente 
FROM clientes AS p 
WHERE p.cpf = :cpf
```

:::tip[Regras de sintaxe]
- **SELECT** - Use `AS` com base na tabela renomeada no `FROM` para selecionar as colunas que serão retornadas dentro da política
- **FROM** - Obrigatório usar `AS` na tabela selecionada
- **WHERE** - Use dois pontos `:` para sinalizar que esse valor vai ser recebido da política quando a query for executada
:::

#### 2. Avançar

Clique em **Avançar** para seguir para etapa 3.

---

### Etapa 3 - Mapeamento dos campos

#### 1. Envio (Placeholder)

Mapeamento do envio da query.

**Descrição:** Aqui os parâmetros de envio da query (precedidos por `:`) precisam ser mapeados com os campos do sistema.

**Como funciona:**
- Os parâmetros na sua query (ex.: `:cpf`) serão os `placeholder` de envio
- Os `Campo do Sistema` serão responsáveis pelo preenchimento da consulta feita no banco de dados durante a execução da política

**Exemplo de mapeamento:**

| Placeholder | Campo do Sistema |
|-------------|------------------|
| `:cpf` | `cliente.cpf` |

#### 2. Retorno

Mapeamento do retorno da query.

**Descrição:** Aqui será necessário fazer o mapeamento dos campos retornados pela query SQL com os campos existentes no sistema.

**Como funciona:**
- Os `Campos Retorno` são os campos retornados do `SELECT` da query
- Os `Campo do Sistema` serão responsáveis por receber e mostrar esses campos retornados dentro da política durante sua execução ou edição

**Exemplo de mapeamento:**

| Campo Retorno | Campo do Sistema | Tipo |
|---------------|------------------|------|
| `nome_cliente` | `cliente.nome_completo` | `string` |
| `idade_cliente` | `cliente.idade` | `int` |

:::note[Observação]
O `Tipo` do campo é obrigatório para garantir o correto processamento dos dados retornados.
:::

---

## Duplicar Integração

Para agilizar a criação de integrações com configurações semelhantes, a plataforma Wisedit oferece a funcionalidade de duplicar uma integração já existente. Este recurso economiza tempo ao evitar que você precise preencher novamente todas as informações de uma integração.

### Como duplicar uma integração

<Steps>
1. No menu, acesse a listagem de **Conexões** na barra lateral
2. Na lista, acesse a conexão de banco de dados desejada
3. Dentro da listagem de integrações, clique no **ícone de cópia**, localizado ao lado do ícone de edição (lápis)
</Steps>

Ao clicar no ícone, o formulário de **Adicionar nova integração** será aberto, já preenchido com todas as informações da integração original utilizada como referência.

**Informações duplicadas:**

- Nome da integração (com sufixo "- Cópia")
- Descrição
- Situação e Alerta
- Query SQL
- Mapeamento de Campo:
  - Seção de envio
  - Seção de retorno

---

## Editar Integração

Após configurar suas integrações, você pode precisar atualizar informações. O processo de edição é simples e direto.

### Como editar uma integração

<Steps>
1. Acesse a tela de **Conexões**
2. Localize na lista a conexão de banco de dados desejada
3. Dentro da conexão, selecione a integração que deseja editar
4. Clique no ícone de edição (formato de lápis)
</Steps>

:::note[Observações]
- Caso seja alterada a query SQL, será necessário refazer o mapeamento de campos se houver mudança nos parâmetros
- **Em caso de dúvida sobre o preenchimento:** Consulte o tópico [Adicionar uma nova integração SQL](#adicionar-uma-nova-integração-sql) nesta documentação. Os campos e suas regras de preenchimento são os mesmos quando adiciona uma nova integração.
:::