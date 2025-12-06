---
title: Integração CSV
description: Guia completo sobre como configurar e utilizar integrações CSV no sistema Wisedit, usando arquivos .CSV como fonte de dados para facilitar testes e criação de bancos de dados simples.
---

import { Steps } from '@astrojs/starlight/components';

## O que é a integração CSV

A integração CSV serve para usar arquivos no formato .CSV como fonte de banco de dados. Facilita o uso e mapeamento de campos dentro do sistema sem precisar ter um banco de dados ou uma API complexa no primeiro momento, facilitando testes e criação de bancos de dados simples.

## Listagem de integrações CSV

Toda integração CSV precisa estar dentro de uma conexão CSV inicial.

:::note[Saiba mais]
Consulte o guia [Como criar uma conexão](/conexoes/#adicionar-uma-nova-conexao) antes de prosseguir.
:::

Ao acessar uma conexão CSV, estarão listadas todas as integrações daquela conexão CSV. Você pode adicionar uma nova ou inativar integrações já existentes.

## Adicionar uma nova integração CSV

Campos marcados com `*` são obrigatórios.

### Etapa 1 - Configuração Geral

#### 1. Nome da Integração *

- **Descrição:** Nome amigável e único para identificar esta integração.
- **Exemplos:** `CPF Blocklist`, `Endereço das CIAS`.

#### 2. Separador *

- **Descrição:** Selecionar o tipo de separador do arquivo .CSV, indicando o formato do arquivo anexado.
- **Tipos:** `Ponto e Vírgula` ou `Vírgula`.

#### 3. Situação *

- **Descrição:** Indica se a integração está ativa ou inativa para uso.
- **Tipos:**
  - `Ativo`: a conexão poderá ser utilizada nas execuções, opção preenchida por padrão.
  - `Inativo`: a conexão ficará salva, mas não será utilizada.

#### 4. Alerta *

- **Descrição:** Define se o sistema deve emitir notificações em caso de falha ou indisponibilidade.

:::caution[Pendente]
Definição funcional pendente para o comportamento do campo Alerta.
:::

#### 5. Descrição

- **Descrição:** Campo opcional para adicionar informações relacionadas à integração que está sendo cadastrada.

#### 6. Arquivo Integração

- **Descrição:** Arquivo no formato .CSV com o tamanho máximo de **20MB** que será usado como fonte de dados da integração.

#### 7. Avançar

Clique em **Avançar** para seguir para etapa 2.

---

### Etapa 2 - Mapeamento dos campos

Aqui será necessário fazer o mapeamento dos campos do arquivo .CSV com os campos existentes no sistema.

**Como funciona:**

| Conceito | Descrição |
|----------|-----------|
| **Campos de origem** | Campos encontrados dentro do arquivo CSV, usando o padrão de colunas sendo cada campo |
| **Campos de destino** | Campos do sistema previamente cadastrados que vão representar o valor que será passado a ele pelo arquivo .CSV |

Depois de realizar o mapeamento dos campos, clique em **CADASTRAR** para adicionar uma nova integração CSV.

<!-- TODO: Adicionar imagem integracao-csv-mapeamento.gif -->
<!-- ![Mapeamento de campos CSV](./assets/integracao-csv-mapeamento.gif) -->

---

## Duplicar Integração

Para agilizar a criação de integrações com configurações semelhantes, a plataforma Wisedit oferece a funcionalidade de duplicar uma já existente. Este recurso economiza tempo ao evitar que você precise preencher novamente todas as informações de uma conexão.

### Como duplicar uma integração

<Steps>
1. No menu, acesse a listagem de **Conexões** na barra lateral
2. Na lista, acesse a conexão do tipo `.CSV` desejada
3. Dentro da listagem de integrações, clique no **ícone de cópia**, localizado ao lado do ícone de edição (lápis)
</Steps>

Ao clicar no ícone, será redirecionado para o registro de uma nova integração, aproveitando algumas informações da integração original utilizada como referência para duplicar.

:::note[Pendente]
Documentar quais informações precisam ser preenchidas após a duplicação.
:::

---

## Editar Integração

Após configurar suas integrações, você pode precisar atualizar informações. O processo de edição é simples e direto.

### Como editar uma integração

<Steps>
1. Acesse a tela de **Conexões**
2. Localize na lista a conexão do tipo `.CSV` desejada
3. Dentro da conexão, selecione a integração que deseja editar
4. Clique no ícone de edição (formato de lápis)
</Steps>

<!-- TODO: Adicionar imagem integracao-csv-editar.gif -->
<!-- ![Editar integração CSV](./assets/integracao-csv-editar.gif) -->

:::caution[Pontos importantes]
- Caso seja alterado o arquivo `.CSV`, será descartado o mapeamento realizado anteriormente
- Todos os campos podem ser alterados
- **Em caso de dúvida sobre o preenchimento:** Consulte o tópico [Adicionar uma nova integração CSV](#adicionar-uma-nova-integração-csv) nesta documentação. Os campos e suas regras de preenchimento são os mesmos que no momento de adicionar.
:::