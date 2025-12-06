---
title: Integração SOAP
description: Guia completo sobre como configurar e utilizar integrações SOAP no sistema Wisedit, incluindo autenticação, mapeamento de campos e exemplos práticos.
---



import { Steps, Tabs, TabItem } from '@astrojs/starlight/components';

:::caution[Pendente]
Aplicar melhoria para gerar GIFs demonstrativos da documentação.
:::

## O que é a integração SOAP

A integração SOAP (Simple Object Access Protocol) permite conectar e consumir web services baseados em SOAP no sistema Wisedit. Com ela, você pode:

- Consumir serviços SOAP de sistemas externos
- Executar métodos/operações disponíveis no WSDL
- Mapear parâmetros de entrada usando placeholders (`@` e `!`)
- Mapear respostas XML para campos do sistema
- Configurar diferentes tipos de autenticação (Basic Auth, Auth Body, ou sem autenticação)

### Requisitos

Toda integração SOAP deve estar vinculada a uma **Conexão** previamente configurada.

:::note[Saiba mais]
Consulte o guia [Como criar uma conexão](/conexoes/#adicionar-uma-nova-conexao) antes de prosseguir.
:::

## Listagem de integrações SOAP

Para acessar suas integrações:

<Steps>
1. Navegue até **Conexões** no menu lateral
2. Selecione uma conexão existente
3. Visualize todas as integrações vinculadas àquela conexão
</Steps>

Nesta tela você pode:

- Adicionar novas integrações
- Editar integrações existentes
- Duplicar integrações
- Inativar integrações

## Adicionar uma nova integração SOAP

### Etapa 1 - Configuração Geral

Campos marcados com `*` são obrigatórios.

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
  - `Sim`: o usuário recebe uma notificação no e-mail informando, opção preenchida por padrão como ativa.
  - `Não`: não será notificado sobre indisponibilidades.

#### 4. Descrição

- **Descrição:** Campo opcional para adicionar informações relacionadas à integração que está sendo cadastrada.

#### 5. Binding *

- **Descrição:** Binding SOAP disponível no WSDL do serviço.
- **Observação:** Selecionado automaticamente com base no WSDL configurado na conexão.
- **Exemplos:** `NumberConversionSoapBinding12 - SOAP 1.2`, `ServiceSoapBinding - SOAP 1.1`.

#### 6. URL da integração *

- **Descrição:** Endpoint completo do serviço SOAP a ser consumido.
- **Exemplos:** `https://www.dataaccess.com/webservicesserver/NumberConversion.wso`, `https://exemplo.com/webservice/service.asmx`.

#### 7. Método *

- **Descrição:** Operação/método SOAP que será executado nesta integração.
- **Observação:** Lista de métodos disponíveis baseada no WSDL do serviço.
- **Exemplos:** `NumberToWords`, `NumberToDollars`, `ConsultarCEP`, `ValidarCPF`.

#### 8. Autenticação *

- **Descrição:** Tipo de autenticação necessária para acessar o serviço SOAP.
- **Tipos:**
  - `NO AUTHENTICATION`: Sem autenticação (serviços públicos).
  - `BASIC AUTH`: Autenticação HTTP Basic (credenciais no header).
  - `AUTH BODY`: Autenticação no corpo da requisição SOAP (credenciais no envelope XML).

---

#### Detalhamento dos Tipos de Autenticação

<Tabs>
  <TabItem label="NO AUTHENTICATION">
    **Descrição:** Não requer autenticação para acessar o serviço.
    
    **Uso:** Serviços públicos ou que não exigem credenciais.
  </TabItem>
  <TabItem label="BASIC AUTH">
    **Descrição:** Autenticação HTTP Basic, onde as credenciais são enviadas no header da requisição HTTP.
    
    **Uso:** Serviços que requerem autenticação padrão HTTP.
    
    **Campos adicionais obrigatórios:**

    | Campo | Descrição | Exemplo |
    |-------|-----------|---------|
    | Username * | Usuário para autenticação no serviço SOAP | `usuario_api`, `admin@empresa.com` |
    | Password * | Senha para autenticação no serviço SOAP (campo sensível) | - |
  </TabItem>
  <TabItem label="AUTH BODY">
    **Descrição:** Autenticação enviada no corpo (body) da requisição SOAP, inserida diretamente no envelope XML.
    
    **Uso:** Serviços que requerem credenciais dentro do XML da requisição.
    
    **Observação:** Requer mapeamento manual de placeholders de autenticação na Etapa 2.
    
    **Placeholders de autenticação:**
    - Use `!` (exclamação) antes do nome do placeholder para campos de autenticação.
    - Exemplos: `!login`, `!senha`, `!token`, `!apikey`.
  </TabItem>
</Tabs>

:::tip[Diferença importante]
- Placeholders de dados usam `@` (arroba): `@nome_usuario`
- Placeholders de autenticação usam `!` (exclamação): `!login`
:::

#### 9. Avançar

Clique em **Avançar** para seguir para etapa 2.

---

### Etapa 2 - Conexão de Campos (Mapeamento)

Nesta etapa, você configura o envelope SOAP e mapeia os campos de entrada e saída.
A etapa possui duas abas: **Envio** e **Retorno**.

---

#### Aba Envio

Esta aba é dividida em três seções principais: Body (Envelope de requisição), Mapeamento de campos do sistema e Mapeamento de autenticação (quando aplicável).

##### 1. Body - Envelope de requisição

O sistema gera automaticamente o envelope SOAP baseado no WSDL do serviço selecionado. Você pode visualizar e editar o XML da requisição.

**Observações:**
- Para mapear campos do sistema dentro do envelope use `@` exemplo: `@nomeOperacao`.
- Caso seja um campo de autenticação use `!` exemplo: `!login`.

**Exemplo de estrutura do envelope:**

```xml
<soapenv:Envelope xmlns:soapenv="http://www.w3.org/2003/05/soap-envelope"
  xmlns:ns="http://www.dataaccess.com/webservicesserver/">
    <soapenv:Header/>
    <soapenv:Body>
        <ns:NumberToWords>
            <ns:ubiNum>
                @nome_user
            </ns:ubiNum>
        </ns:NumberToWords>
    </soapenv:Body>
</soapenv:Envelope>
```

**Tabela de símbolos:**

| Símbolo | Uso | Descrição |
|---------|-----|-----------|
| `@` | Campos de dados | Para mapear campos do sistema dentro do envelope. Exemplo: `@nomeOperacao`, `@cpfCliente` |
| `!` | Campos de autenticação | Para campos de autenticação (apenas AUTH BODY). Exemplo: `!login`, `!senha` |

**Exemplo de envelope com AUTH BODY:**

```xml
<soapenv:Envelope xmlns:soapenv="http://www.w3.org/2003/05/soap-envelope"
  xmlns:ns="http://www.dataaccess.com/webservicesserver/">
    <soapenv:Header/>
    <soapenv:Body>
        <ns:NumberToWords>
            <ns:ubiNum>
                @nome_user
                !login
                !senha
            </ns:ubiNum>
        </ns:NumberToWords>
    </soapenv:Body>
</soapenv:Envelope>
```

##### 2. Mapeamento de campos do sistema

Aqui os placeholders definidos no envelope SOAP (precedidos por `@`) precisam ser mapeados com os campos existentes no sistema.

**Como funciona:**
- Os placeholders na sua query (ex.: `@nome_user`), aparecerão automaticamente na coluna `Placeholder`.
- Os `Campo do sistema`, serão responsáveis pelo fornecimento dos valores durante a execução da política.
- O sistema substituirá automaticamente `@placeholder` pelo valor do campo mapeado.

**Exemplo de mapeamento:**

| Placeholder | Campo do sistema |
|-------------|------------------|
| `@nome_user` | `usuario.nome_completo` |
| `@cpf_cliente` | `cliente.cpf` |
| `@data_inicio` | `filtro.data_inicial` |

##### 3. Mapeamento de autenticação (apenas para AUTH BODY)

Esta seção aparece somente quando o tipo de autenticação selecionado é **AUTH BODY**. Aqui você define os valores das credenciais que serão enviadas no envelope SOAP.

**Como funciona:**
- Os placeholders de autenticação definidos no envelope (precedidos por `!`) aparecerão automaticamente na coluna `Placeholder`.
- Insira diretamente os valores de **username** e **password** na coluna `Value`.
- Estes valores são inseridos diretamente (não são mapeados de campos do sistema).
- As credenciais são enviadas dentro do corpo do envelope SOAP.

**Exemplo de mapeamento:**

| Placeholder | Value |
|-------------|-------|
| `!login` | `usuario_sistema` |
| `!senha` | `senha_secreta_123` |

:::caution[Importante]
- Placeholders de autenticação sempre usam `!` (exclamação), diferente dos placeholders de dados que usam `@` (arroba).
- Os valores inseridos aqui são credenciais sensíveis. Certifique-se de usar credenciais apropriadas para o ambiente.
:::

---

#### Aba Retorno

Nesta aba, você mapeia os dados retornados pelo serviço SOAP com os campos do sistema.

##### 1. Response - XML Schema (Opcional)

Você pode visualizar ou adicionar o XML Schema da resposta esperada do serviço SOAP.

**Como acessar:** Clique em **⊕ Xml Schema** para abrir o modal.

**Funcionalidade:**
- Digite ou cole o XML Schema esperado da resposta.
- Isso ajuda a identificar os campos disponíveis no retorno.
- É opcional, mas recomendado para documentação e referência.

##### 2. Mapeamento de campos de retorno

Aqui será necessário fazer o mapeamento dos campos retornados pela resposta SOAP com os campos existentes no sistema.

**Como funciona:**
- Os `Campos de origem` são os campos que virão na resposta XML do serviço SOAP.
- Os `Campos de destino` serão responsáveis por receber e armazenar esses dados retornados dentro da política durante sua execução ou edição.
- Defina o `Tipo` de dado esperado para cada campo (string, int, boolean, date, etc.).

##### 3. Cadastrar

Após concluir todos os mapeamentos de envio e retorno, clique em **Cadastrar** para salvar a integração.

---

## Duplicar Integração

Economize tempo criando integrações similares a partir de uma existente.

### Como duplicar

<Steps>
1. Acesse **Conexões** no menu lateral
2. Selecione a conexão desejada do tipo `soap`
3. Na lista de integrações, localize a integração que deseja duplicar
4. Clique no **ícone de cópia** ao lado do ícone de edição
5. O formulário abrirá com todos os campos preenchidos
6. Faça as alterações necessárias e salve
</Steps>

:::tip[Dica]
Ideal para criar variações de métodos do mesmo serviço SOAP ou integrações de teste. Em caso de dúvida você pode consultar o passo a passo de adicionar a integração `soap` como referência.
:::

---

## Editar Integração

### Como editar

<Steps>
1. Acesse **Conexões** no menu lateral
2. Selecione a conexão desejada do tipo soap
3. Localize a integração na lista
4. Clique no **ícone de edição**
5. Faça as alterações necessárias
6. Salve as modificações
</Steps>

### Atenção ao editar

| Tipo de Alteração | Impacto no Mapeamento |
|-------------------|----------------------|
| Adicionar/remover placeholders no envelope | Requer refazer mapeamento de envio |
| Alterar campos de retorno | Requer refazer mapeamento de retorno |
| Alterar tipo de autenticação | Requer reconfigurar credenciais/mapeamento |
| Alterar método SOAP | Requer refazer envelope e todos os mapeamentos |
| Alterar URL da integração | Não afeta mapeamento |
| Alterar nome ou descrição | Não afeta mapeamento |

---

## Exemplos Práticos

### Exemplo 1: Conversão de número para palavras (NO AUTHENTICATION)

**Configuração:**
- **Método:** `NumberToWords`
- **URL:** `https://www.dataaccess.com/webservicesserver/NumberConversion.wso`
- **Autenticação:** NO AUTHENTICATION

**Envelope de envio:**

```xml
<soapenv:Envelope xmlns:soapenv="http://www.w3.org/2003/05/soap-envelope"
  xmlns:ns="http://www.dataaccess.com/webservicesserver/">
    <soapenv:Header/>
    <soapenv:Body>
        <ns:NumberToWords>
            <ns:ubiNum>
                @numero_entrada
            </ns:ubiNum>
        </ns:NumberToWords>
    </soapenv:Body>
</soapenv:Envelope>
```

**Mapeamento de envio:**

| Placeholder | Campo do sistema |
|-------------|------------------|
| `@numero_entrada` | `documento.valor_numerico` |

**Mapeamento de retorno:**

| Campo de origem | Campo de destino | Tipo |
|-----------------|------------------|------|
| `NumberToWordsResult` | `documento.valor_por_extenso` | `string` |

---

### Exemplo 2: Consulta de CEP com Basic Auth

**Configuração:**
- **Método:** `ConsultarCEP`
- **URL:** `https://exemplo.com/webservice/cep.asmx`
- **Autenticação:** BASIC AUTH
- **Username:** `usuario_api`
- **Password:** `senha_api`

**Envelope de envio:**

```xml
<soapenv:Envelope xmlns:soapenv="http://www.w3.org/2003/05/soap-envelope"
  xmlns:ns="http://exemplo.com/webservice/">
    <soapenv:Header/>
    <soapenv:Body>
        <ns:ConsultarCEP>
            <ns:cep>
                @cep_busca
            </ns:cep>
        </ns:ConsultarCEP>
    </soapenv:Body>
</soapenv:Envelope>
```

**Mapeamento de envio:**

| Placeholder | Campo do sistema |
|-------------|------------------|
| `@cep_busca` | `endereco.cep` |

**Mapeamento de retorno:**

| Campo de origem | Campo de destino | Tipo |
|-----------------|------------------|------|
| `logradouro` | `endereco.rua` | `string` |
| `bairro` | `endereco.bairro` | `string` |
| `cidade` | `endereco.cidade` | `string` |
| `uf` | `endereco.estado` | `string` |

---

### Exemplo 3: Validação de documento com Auth Body

**Configuração:**
- **Método:** `ValidarDocumento`
- **URL:** `https://exemplo.com/webservice/validacao.asmx`
- **Autenticação:** AUTH BODY

**Envelope de envio:**

```xml
<soapenv:Envelope xmlns:soapenv="http://www.w3.org/2003/05/soap-envelope"
  xmlns:ns="http://exemplo.com/webservice/">
    <soapenv:Header/>
    <soapenv:Body>
        <ns:ValidarDocumento>
            <ns:credenciais>
                <ns:usuario>!login</ns:usuario>
                <ns:senha>!senha</ns:senha>
            </ns:credenciais>
            <ns:documento>
                <ns:numero>@numero_documento</ns:numero>
                <ns:tipo>@tipo_documento</ns:tipo>
            </ns:documento>
        </ns:ValidarDocumento>
    </soapenv:Body>
</soapenv:Envelope>
```

**Mapeamento de envio:**

| Placeholder | Campo do sistema |
|-------------|------------------|
| `@numero_documento` | `cliente.cpf_cnpj` |
| `@tipo_documento` | `cliente.tipo_documento` |

**Mapeamento de autenticação:**

| Placeholder | Value |
|-------------|-------|
| `!login` | `usuario_sistema` |
| `!senha` | `senha_sistema` |

**Mapeamento de retorno:**

| Campo de origem | Campo de destino | Tipo |
|-----------------|------------------|------|
| `valido` | `cliente.documento_valido` | `boolean` |
| `mensagem` | `cliente.mensagem_validacao` | `string` |

---

## Dicas e Boas Práticas

### Boas Práticas

1. **Nomeie integrações de forma descritiva**
   - Use nomes que identifiquem claramente o método e a finalidade
   - Exemplo: `SOAP - Validar CPF - Receita Federal`

2. **Documente no campo Descrição**
   - Adicione informações sobre o que a integração faz
   - Inclua observações sobre limitações ou requisitos específicos

3. **Use placeholders significativos**
   - `@cpf_cliente` é melhor que `@valor1`
   - `@data_inicial_filtro` é melhor que `@data1`

4. **Teste com dados reais**
   - Valide os mapeamentos com cenários reais
   - Verifique se os tipos de dados estão corretos

5. **Configure alertas para integrações críticas**
   - Ative a opção "Alerta" para receber notificações de falhas
   - Monitore integrações que afetam processos importantes

---

## Recursos Adicionais

### Ferramentas úteis

- **SOAP UI:** Ferramenta para testar serviços SOAP
- **Postman:** Também suporta testes de requisições SOAP
- **XML Validators:** Para validar estrutura do envelope

### Links úteis

- [Especificação SOAP 1.2](https://www.w3.org/TR/soap12/)
- [Tutorial de WSDL](https://www.w3.org/TR/wsdl20-primer/)
- [Documentação XML Schema](https://www.w3.org/XML/Schema)
