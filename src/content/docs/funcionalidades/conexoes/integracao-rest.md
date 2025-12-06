---
title: Integração REST
description: Guia completo sobre como configurar e utilizar integrações REST no sistema Wisedit, incluindo métodos HTTP, tipos de autenticação, mapeamento de parâmetros e tratamento de erros.
---

import { Steps, Tabs, TabItem } from '@astrojs/starlight/components';

:::caution[Pendente]
Aplicar melhoria para entender um comportamento do dropdown para finalizar e adicionar os GIFs.
:::

## O que é a integração REST

A integração REST serve para conectar APIs RESTful como fonte de dados no sistema. Permite executar requisições HTTP (GET, POST, PUT, DELETE) para APIs externas, configurar autenticação, mapear parâmetros de envio (query string e body) e processar os dados retornados, facilitando a comunicação com serviços web externos.

## Listagem de integrações REST

Toda integração REST precisa estar dentro de uma conexão do tipo REST.

:::note[Saiba mais]
Consulte o guia [Como criar uma conexão](/conexoes/#adicionar-uma-nova-conexao) antes de prosseguir.
:::

Ao acessar uma conexão do tipo REST, estarão listadas todas as integrações daquela conexão. Você pode adicionar uma nova ou inativar integrações já existentes.

## Adicionar uma nova integração REST

Campos marcados com `*` são obrigatórios.

### Etapa 1 - Configuração Geral (Integração)

#### 1. Nome da Integração *

- **Descrição:** Nome amigável e único para identificar esta integração.
- **Exemplos:** `Consulta Usuários API`, `Criar Pedido Externo`, `Atualizar Status Cliente`.

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

### Etapa 2 - Configuração de Acesso (Autenticação)

Nesta etapa você define como será realizada a comunicação com a API externa.

#### 1. Base URL da conexão *

- **Descrição:** URL base da API que será consumida.
- **Exemplo:** `https://jsonplaceholder.typicode.com`

#### 2. Path da conexão *

- **Descrição:** Caminho específico do endpoint da API que será acessado.
- **Exemplo:** `/posts`, `/users`, `/api/v1/produtos`

#### 3. Tipo de autenticação *

Define o método de autenticação que será utilizado para acessar a API.

**Tipos disponíveis:**

| Tipo | Descrição |
|------|-----------|
| `NO AUTHENTICATION` | Sem autenticação (APIs públicas) |
| `AUTH BODY` | Credenciais enviadas no corpo da requisição |
| `BASIC AUTH` | Autenticação básica com usuário e senha |
| `BEARER TOKEN` | Token de autenticação no cabeçalho |
| `API KEY` | Chave de API para autenticação |

---

#### Configuração dos Tipos de Autenticação

<Tabs>
  <TabItem label="NO AUTHENTICATION">
    Não precisa de configurações adicionais, pois não requer autenticação para uso.
  </TabItem>

  <TabItem label="AUTH BODY">
    Quando o tipo de autenticação selecionado for **AUTH BODY**, você terá acesso ao toggle **"Usar autenticação da conexão"**, que oferece duas formas de configuração:

    ##### Toggle DESLIGADO - Configuração manual

    Nesta opção, você configura manualmente as credenciais que serão enviadas no corpo da requisição de autenticação.

    **Objeto JSON de envio:**
    - **Descrição:** Adicione os valores correspondentes de chave e valor do objeto que será enviado no body da requisição de autenticação.
    - **Campos:**
      - **JSON Key:** Nome da chave do campo de autenticação (ex: `username`, `password`, `client_id`)
      - **JSON Value:** Valor correspondente que será enviado (ex: `admin`, `senha123`)
    - **Botão "⊕ Adicionar":** Permite adicionar múltiplos pares de chave-valor conforme necessário.

    ##### Toggle LIGADO - Usar autenticação da conexão

    Nesta opção, você reutiliza credenciais que foram retornadas de uma conexão/autenticação anterior.

    **Autenticar como:**
    - **Descrição:** Selecione de onde virão as credenciais de autenticação.
    - **Opção:** `Campos de retorno da conexão` - Utiliza valores que foram retornados em uma etapa anterior de autenticação.

    **Mapeamento:**
    - **Retorno da conexão (value):** Selecione o campo que contém o valor retornado pela conexão anterior (ex: token, access_token, api_key).
    - **Chave de autenticação (key):** Digite a chave que será utilizada para enviar este valor na autenticação (ex: `Authorization`, `Bearer`, `token`).
    - **Botão "⊕ Adicionar":** Permite adicionar múltiplos mapeamentos conforme necessário.

    **Como funciona:**
    - O sistema utilizará os valores retornados de uma conexão anterior para compor as credenciais de autenticação da requisição atual.
    - Útil quando há um fluxo de autenticação em múltiplas etapas ou quando tokens precisam ser renovados.
  </TabItem>

  <TabItem label="BASIC AUTH">
    Quando o tipo de autenticação selecionado for **BASIC AUTH**, você terá acesso ao toggle **"Usar autenticação da conexão"**, que oferece duas formas de configuração:

    ##### Toggle DESLIGADO - Configuração manual

    Nesta opção, você configura manualmente as credenciais de usuário e senha que serão enviadas no cabeçalho da requisição.

    **Username *:**
    - **Descrição:** Campo de texto onde você deve inserir o nome de usuário para autenticação.
    - **Exemplo:** `admin`, `usuario@email.com`, `api_user`

    **Password *:**
    - **Descrição:** Campo de texto (oculto) onde você deve inserir a senha correspondente ao usuário.
    - **Formato:** String que será codificada em Base64 junto com o username.
    - **Exemplo:** `senha123`, `P@ssw0rd!`

    **Como funciona:**
    - O sistema codificará automaticamente as credenciais no formato Base64 (`username:password`).
    - As credenciais serão enviadas no cabeçalho da requisição como: `Authorization: Basic {credenciais_codificadas}`

    ##### Toggle LIGADO - Usar autenticação da conexão

    Nesta opção, você reutiliza credenciais que foram retornadas de uma conexão/autenticação anterior.

    **Autenticar como:**
    - **Descrição:** Selecione de onde virão as credenciais de autenticação.
    - **Opção:** `Campos de retorno da conexão` - Utiliza valores que foram retornados em uma etapa anterior de autenticação.

    **Mapeamento:**

    O sistema permite criar dois mapeamentos separados com as chaves fixas:

    | Mapeamento | Retorno da conexão (value) | Chave de autenticação (key) |
    |------------|---------------------------|----------------------------|
    | Primeiro | Campo que contém o username | `username` (campo fixo) |
    | Segundo | Campo que contém o password | `password` (campo fixo) |

    **Como funciona:**
    - O sistema utilizará os valores retornados de uma conexão anterior (username e password) para compor a autenticação Basic.
    - As credenciais serão automaticamente codificadas em Base64 e enviadas no cabeçalho.
    - Útil quando você precisa obter as credenciais dinamicamente através de uma requisição anterior.
  </TabItem>

  <TabItem label="BEARER TOKEN">
    Quando o tipo de autenticação selecionado for **BEARER TOKEN**, você terá acesso ao toggle **"Usar autenticação da conexão"**, que oferece duas formas de configuração:

    ##### Toggle DESLIGADO - Configuração manual

    Nesta opção, você configura manualmente o token que será enviado no cabeçalho da requisição.

    **Token *:**
    - **Descrição:** Campo de texto onde você deve inserir o token de autenticação Bearer que será enviado no cabeçalho da requisição.
    - **Formato:** Digite o token completo (geralmente uma string longa de caracteres alfanuméricos).
    - **Exemplo:** `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ`

    ##### Toggle LIGADO - Usar autenticação da conexão

    Nesta opção, você reutiliza um token que foi retornado de uma conexão/autenticação anterior.

    **Autenticar como:**
    - **Descrição:** Selecione de onde virá o token de autenticação.
    - **Opção:** `Campos de retorno da conexão` - Utiliza valores que foram retornados em uma etapa anterior de autenticação.

    **Mapeamento:**
    - **Retorno da conexão (value):** Selecione o campo que contém o token retornado pela conexão anterior (ex: token, access_token, bearer_token).
    - **Chave de autenticação (key):** Digite a chave que será utilizada para enviar este valor na autenticação. Normalmente é `token` ou `Authorization`.

    :::note
    O sistema adicionará automaticamente o prefixo "Bearer" no cabeçalho da requisição.
    :::

    **Como funciona:**
    - O sistema utilizará o token retornado de uma conexão anterior para compor o cabeçalho de autenticação da requisição atual.
    - O token será enviado no formato: `Authorization: Bearer {token}`
    - Útil quando você precisa primeiro fazer uma requisição de login para obter o token e depois usar esse token em outras requisições.
  </TabItem>

  <TabItem label="API KEY">
    Quando o tipo de autenticação selecionado for **API KEY**, você terá acesso ao toggle **"Usar autenticação da conexão"**, que oferece duas formas de configuração:

    ##### Toggle DESLIGADO - Configuração manual

    Nesta opção, você configura manualmente a chave de API que será enviada na requisição.

    **Token key *:**
    - **Descrição:** Campo de texto onde você deve inserir o nome da chave que será usada para enviar a API Key (geralmente no cabeçalho ou query string).
    - **Exemplos comuns:** `api_key`, `x-api-key`, `apikey`, `Authorization`

    **Token value *:**
    - **Descrição:** Campo de texto onde você deve inserir o valor da API Key fornecida pelo serviço externo.
    - **Formato:** String alfanumérica fornecida pelo provedor da API.
    - **Exemplo:** `your_api_key_here_123456789`

    ##### Toggle LIGADO - Usar autenticação da conexão

    Nesta opção, você reutiliza uma API Key que foi retornada de uma conexão/autenticação anterior.

    **Autenticar como:**
    - **Descrição:** Selecione de onde virá a API Key.
    - **Opção:** `Campos de retorno da conexão` - Utiliza valores que foram retornados em uma etapa anterior de autenticação.

    **Mapeamento:**
    - **Retorno da conexão (value):** Selecione o campo que contém a API Key retornada pela conexão anterior (ex: api_key, key, apikey).
    - **Chave de autenticação (key):** Digite o nome da chave que será utilizada para enviar este valor na autenticação (ex: `x-api-key`, `api_key`).
    - **Botão "⊕ Adicionar":** Permite adicionar múltiplos mapeamentos conforme necessário.

    **Como funciona:**
    - O sistema utilizará a API Key retornada de uma conexão anterior para compor a autenticação da requisição atual.
    - A chave será enviada conforme o formato especificado (geralmente no cabeçalho da requisição).
    - Útil quando você precisa obter a API Key dinamicamente através de uma requisição anterior.
  </TabItem>
</Tabs>

---

### Etapa 3 - Conexão de Campos (Mapeamento)

Esta etapa possui duas abas: **Envio** e **Retorno**, onde você configurará o mapeamento dos dados que serão enviados para a API e os dados que serão recebidos como resposta.

---

#### Aba Envio

Nesta aba você configura os dados que serão enviados na requisição para a API externa.

##### 1. Query String

Os parâmetros de query string são enviados diretamente na URL da requisição.

**Prévia da URL:**
- **Descrição:** Mostra em tempo real como ficará a URL completa com os parâmetros mapeados.
- **Formato:** A URL base + path + parâmetros entre chaves duplas `{{NOME_CAMPO}}`
- **Exemplo:** `https://jsonplaceholder.typicode.com/posts?id={{ID USER}}`

**Tabela de mapeamento:**

| Coluna | Descrição |
|--------|-----------|
| Query string | Nome do parâmetro que aparecerá na URL (ex: `id`, `page`, `limit`, `status`) |
| Campo do sistema | Campo do sistema que fornecerá o valor durante a execução |
| Tipo | Tipo de dado do campo (int, string, boolean, date, etc.) |

**Botões de ação:**
- **⊕ Adicionar:** Adiciona uma nova linha para mapear outro parâmetro de query string
- **🗑️ (Lixeira):** Remove a linha de mapeamento

**Exemplo prático:**

| Query string | Campo do sistema | Tipo | Resultado |
|--------------|------------------|------|-----------|
| `id` | `ID USER` | `int` | `?id={{ID USER}}` → `?id=123` |

##### 2. Body

O corpo da requisição contém dados estruturados que serão enviados (usado principalmente em métodos POST e PUT).

**Json Schema:**

Clique em **⊕ Json Schema** para abrir o modal e definir a estrutura JSON que será enviada no corpo da requisição.

```json
{
  "nome": "string",
  "ativo": "boolean",
  "idade": "number",
  "endereco": {
    "rua": "string",
    "cidade": "string"
  }
}
```

**Tabela de mapeamento do body:**

| Coluna | Descrição |
|--------|-----------|
| Campo de origem | Campo do sistema de onde os dados serão retirados |
| Tipo | Tipo de dado (string, boolean, int, object, array, etc.) |
| Campo de destino | Nome da propriedade que aparecerá no JSON enviado |

**Exemplo prático:**

| Campo de origem | Tipo | Campo de destino | Resultado no JSON |
|-----------------|------|------------------|-------------------|
| `Nome Completo PEC` | `boolean` | `teste` | `{ "teste": true }` |

:::note[Observação]
- Para métodos GET e DELETE, normalmente não é necessário configurar o Body
- Para métodos POST e PUT, o Body é obrigatório
:::

---

#### Aba Retorno

Nesta aba você configura como os dados retornados pela API serão mapeados para os campos do sistema.

##### 1. Response

Mapeia os dados de sucesso retornados pela API quando a requisição é bem-sucedida.

**Json Schema:**

Clique em **⊕ Json Schema** para definir a estrutura JSON esperada como resposta da API.

```json
{
  "userId": 1,
  "id": 101,
  "title": "string",
  "body": "string",
  "success": true
}
```

**Tabela de mapeamento do Response:**

| Coluna | Descrição |
|--------|-----------|
| Campo de origem | Nome exato do campo que vem no JSON de resposta da API |
| Campo de destino | Campo do sistema que receberá e armazenará o valor |
| Tipo | Tipo de dado do campo (int, string, object, array, boolean, etc.) |

**Exemplo prático:**

Se a API retorna:
```json
{
  "userId": 1,
  "id": 101,
  "title": "Teste",
  "body": "Conteúdo"
}
```

Mapeamentos possíveis:

| Campo de origem | Campo de destino | Tipo |
|-----------------|------------------|------|
| `userId` | `ID USER` | `int` |
| `id` | `ID USER` | `int` |
| `title` | `Nome Completo PEC` | `string` |
| `body` | `endereço` | `object` |

##### 2. Erro

Mapeia os dados de erro retornados pela API quando a requisição falha. É possível configurar múltiplas seções de erro, cada uma associada a um código de status HTTP específico.

**Estrutura:**
- A seção de Erro pode ter múltiplas subsecções, cada uma representando um tratamento para um código de status diferente
- Cada subsecção possui sua própria tabela de mapeamento e botão "Status Code"

**Tabela de mapeamento:**

| Coluna | Descrição |
|--------|-----------|
| Campo de origem | Nome do campo que vem no JSON de erro retornado pela API |
| Campo de destino | Campo do sistema que receberá a informação de erro |
| Tipo | Tipo de dado do campo de erro (string, int, boolean, object, etc.) |

**Botões de ação:**
- **⊕ Adicionar:** Adiciona uma nova linha de mapeamento dentro da mesma seção de erro
- **🗑️ Status Code (vermelho):** Remove a configuração do código de status da seção atual
- **🗑️ (Lixeira):** Remove a linha de mapeamento
- **⊕ Status Code (azul):** Adiciona uma nova seção de erro para outro código de status HTTP

**Exemplo de configuração por Status Code:**

| Status Code | Campo de origem | Campo de destino |
|-------------|-----------------|------------------|
| 400 (Bad Request) | `message` | `Mensagem de Erro` |
| 404 (Not Found) | `erro_200` | `erro_front` |
| 500 (Internal Server Error) | `error` | `Log de Erros` |

:::caution[Observações importantes]
- Certifique-se de mapear todos os campos necessários tanto no envio quanto no retorno
- O sistema substituirá automaticamente os placeholders (ex: `{{ID USER}}`) pelos valores dos campos mapeados durante a execução
- Verifique se os nomes dos campos de origem correspondem exatamente aos nomes retornados pela API (respeitando maiúsculas/minúsculas)
- Configure diferentes tratamentos de erro para diferentes códigos de status HTTP para ter um controle mais granular sobre as falhas
:::

##### 3. Finalizar

Após configurar todos os mapeamentos de envio e retorno:

- Clique em **Voltar** caso queira revisar as etapas anteriores
- Clique em **Cadastrar** para concluir a criação da integração

---

## Duplicar Integração

Para agilizar a criação de integrações com configurações semelhantes, a plataforma Wisedit oferece a funcionalidade de duplicar uma integração já existente. Este recurso economiza tempo ao evitar que você precise preencher novamente todas as informações de uma integração.

### Como duplicar uma integração

<Steps>
1. No menu, acesse a listagem de **Conexões** na barra lateral
2. Na lista, acesse a conexão do tipo REST desejada
3. Dentro da listagem de integrações, clique no **ícone de cópia**, localizado ao lado do ícone de edição (lápis)
4. O formulário de **Adicionar nova integração** será aberto, já preenchido com todas as informações da integração original
</Steps>

---

## Editar Integração

Após configurar suas integrações, você pode precisar atualizar informações. O processo de edição é simples e direto.

### Como editar uma integração

<Steps>
1. Acesse a tela de **Conexões**
2. Localize na lista a conexão do tipo REST desejada
3. Dentro da conexão, selecione a integração que deseja editar
4. Clique no ícone de edição (formato de lápis)
</Steps>

:::note[Observações]
- Caso seja alterado o método de integração (GET, POST, PUT, DELETE), pode ser necessário reconfigurar os mapeamentos de envio e retorno
- Alterações na Base URL ou Path não afetam o mapeamento existente
- Se houver mudança nos campos de autenticação, verifique se as credenciais continuam válidas
- **Em caso de dúvida sobre o preenchimento:** Consulte o tópico [Adicionar uma nova integração REST](#adicionar-uma-nova-integração-rest) nesta documentação. Os campos e suas regras de preenchimento são os mesmos quando adiciona uma nova integração.
:::