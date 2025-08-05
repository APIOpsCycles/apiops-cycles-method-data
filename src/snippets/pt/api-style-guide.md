# **Princípios de design de API**

Um guia conciso para usabilidade, descoberta e consistência de APIs com base em filosofias de design comprovadas e necessidades dos usuários.

**Resultados**

* Melhor compreensão dos princípios de design de API

**Como funciona**  
**Etapas**

1. **Design que prioriza o consumidor:** inicie cada ciclo de APIOps reunindo as metas do usuário e os termos do domínio para que as APIs resolvam problemas reais.  
2. **Nomeação e comportamento consistentes:** aplique convenções compartilhadas para recursos, erros e formatos para tornar as APIs previsíveis.  
3. **Orientado por contrato:** capture a interface com OpenAPI ou AsyncAPI antes de codificar para alinhar as equipes e permitir a automação.  
4. **Usabilidade e capacidade de descoberta:** forneça documentação e exemplos claros para que os desenvolvedores entendam rapidamente como usar a API.  
5. **Iterar com segurança:** desenvolva projetos em incrementos pequenos e com versões para que as alterações não prejudiquem os consumidores existentes.

Dica

* Personalize os princípios de design da API para seu domínio  
* Use-os de forma colaborativa entre as funções de negócios e de tecnologia

**Guia de estilo da API**

Este guia descreve as práticas recomendadas e os padrões para projetar e implementar APIs RESTful para garantir a segurança, a consistência, a usabilidade e o alinhamento com as metas organizacionais. Ele também se alinha com a Lista de verificação de auditoria de API.  
---

**1\. Segurança e privacidade**  
**Aplicação de HTTPS**

* Todas as APIs devem aplicar o HTTPS para criptografar os dados em trânsito.  
* Informações confidenciais (por exemplo, tokens, credenciais, dados pessoais) nunca devem ser transmitidas em URLs ou parâmetros de consulta. Use o corpo da solicitação para esses dados.

**Controle de acesso baseado em função (RBAC)**

* Implemente o RBAC usando provedores de identidade e imponha permissões na lógica da API.  
* Documente os controles de acesso específicos da função na documentação da API.  
* **Níveis de maturidade**:  
  * **Básico**: As funções são definidas e o acesso é aplicado manualmente.  
  * **Crescente**: Os provedores de identidade são integrados.  
  * **Dimensionamento**: Verificações dinâmicas de função com base em consumidores de API.  
  * **Inovando**: Aplicação de RBAC automatizada e orientada por políticas.

**Conformidade com a segurança da API da OWASP**

* Aborde os 10 principais riscos de segurança de API da OWASP, incluindo:  
  * **API6:2023 \- Acesso irrestrito a fluxos de negócios confidenciais**: Restrinja os fluxos de negócios confidenciais com autenticação e autorização adequadas.  
  * **API7:2023 \- Falsificação de solicitação do lado do servidor (SSRF)**: Valide as entradas e higienize as respostas para evitar vulnerabilidades de SSRF.  
  * **API2:2023 \- Autenticação quebrada**: Garanta mecanismos de autenticação robustos (por exemplo, OAuth 2.0) e valide os fluxos de trabalho de expiração de token.

**Criptografia em repouso**

* Os dados confidenciais armazenados em bancos de dados devem ser criptografados em repouso usando algoritmos padrão do setor.  
* Valide que nenhum dado confidencial apareça em registros ou URLs.

---

**2\. Métodos HTTP**  
**Uso padrão**

* Use os métodos HTTP de forma consistente:  
  * GET: Recupera dados sem modificar o estado do servidor.  
  * POST: Criar novos recursos ou acionar operações no lado do servidor.  
  * PUT: Atualizar recursos existentes (usar payloads de recursos completos).  
  * PATCH: Atualizar parcialmente um recurso existente.  
  * DELETE: remover um recurso.

**Idempotência**

* Certifique-se de que os métodos PUT, PATCH e DELETE sejam idempotentes, o que significa que várias solicitações idênticas resultam no mesmo estado.

**Teste de métodos HTTP**

* Valide todos os métodos HTTP por meio de testes de integração para garantir a conformidade com o comportamento esperado.

---

**3\. Tratamento de erros e respostas**  
**Formato de erro padronizado**

* Todas as APIs devem retornar erros em um formato padronizado. Exemplo:

`{`  
 `"error": "invalid_request",`  
 `"message": "A solicitação está faltando um parâmetro obrigatório",`  
 `"details": [`  
    
`"O parâmetro 'user_id' é obrigatório."`  
 `]`  
`}`

**Descrições detalhadas**

* Inclua mensagens de erro legíveis por humanos para ajudar os desenvolvedores a depurar problemas.  
* Certifique-se de que os códigos e as descrições de erro estejam alinhados com a especificação da OpenAPI.

**Códigos de status HTTP**

* Use códigos de status apropriados para cada operação:  
  * 200 OK: Operações GET, PUT ou PATCH bem-sucedidas.  
  * 201 Created (Criado): Operação POST bem-sucedida que resulta em um novo recurso.  
  * 204 No Content (Sem conteúdo): Operação DELETE bem-sucedida.  
  * 400 Bad Request: Entrada inválida ou parâmetros ausentes.  
  * 401 Unauthorized (Não autorizado): Falha na autenticação.  
  * 403 Forbidden: permissões insuficientes.  
  * 404 Not Found (Não encontrado): O recurso não existe.  
  * 429 Too Many Requests (Muitas solicitações): Limite de taxa excedido.

**Teste de cenários de erro**

* Valide todos os cenários de erro para garantir respostas adequadas e mensagens de erro acionáveis.  
* **Níveis de maturidade**:  
  * **Básico**: Tratamento básico de erros para os principais cenários.  
  * **Crescente**: Mensagens de erro detalhadas para todos os endpoints.  
  * **Dimensionamento**: Validação automatizada de erros usando ferramentas de teste.  
  * **Inovando**: Insights orientados por IA para padrões e previsões de erros.

---

**4\. Documentação e experiência do desenvolvedor**  
**Documentação interativa**

* Gere documentação de API usando a especificação OpenAPI (versão mais recente compatível).  
* Inclua exemplos de todos os pontos de extremidade para demonstrar fluxos de trabalho de solicitação/resposta.  
* **Níveis de maturidade**:  
  * **Básico**: Documentação estática com exemplos.  
  * **Crescente**: Documentação interativa e gerada automaticamente.  
  * **Escalonamento**: Ferramentas de desenvolvedor para teste de API.  
  * **Inovando**: Ambientes de desenvolvedor incorporados para testes.

**Seção de introdução**

* Forneça uma seção de "Introdução" na documentação para orientar novos usuários sobre autenticação, fluxos de trabalho comuns e pontos de extremidade de teste.  
* Use o modelo de guia de introdução como referência.

**Ambiente de sandbox**

* Ofereça um ambiente de sandbox que espelhe os esquemas de produção e os códigos de erro para testes.  
* Valide o alinhamento da sandbox por meio de testes de auditoria de API.

---

**5\. Convenções e padrões de nomenclatura**  
**Nomenclatura de recursos**

* Use termos em inglês descritivos e padrão do setor para nomes de recursos (por exemplo, livros, usuários, empréstimos).  
* Evite termos ambíguos, como tipo ou status, sem contexto adicional.

**Nomeação de atributos**

* Use camelCase para nomes de atributos (por exemplo, userId, bookTitle).  
* Evite acrônimos e abreviações para garantir a clareza.  
* Valide as convenções de nomenclatura durante a validação da OpenAPI.

---

**6\. Localização e internacionalização**  
**Cabeçalhos Accept**

* Ofereça suporte à localização usando o cabeçalho Accept-Language para respostas de API.  
* Forneça cadeias de caracteres localizadas e garanta que todas as mensagens de erro possam ser traduzidas.

**Formatos de data e hora**

* Use o formato ISO 8601 para todos os campos de data e hora, inclusive fusos horários.

`"createdAt": "2024-12-21T10:00:00Z"`

**Teste de localização**

* Valide as respostas localizadas e as mensagens de erro por meio de testes funcionais.

---

**7\. Controle de versão e depreciação**  
**Estratégia de controle de versão**

* Use o controle de versão semântico (por exemplo, /v1, /v2) para indicar as principais alterações.  
* Evitar mudanças significativas em uma versão. Elimine os pontos de extremidade antigos com aviso prévio suficiente.

**Avisos de descontinuação**

* Comunique as depreciações por meio do Portal do desenvolvedor e inclua cabeçalhos nas respostas da API:

`Depreciação: true`  
`Data de término: 2025-01-01`  
`Link: <https://developer.portal.com/docs/deprecation>; rel="deprecation"`  
---

**8\. Paginação e filtragem**  
**Paginação**

* Use os parâmetros de paginação padrão:  
  * page: Número da página atual.  
  * limite: Número de itens por página.

**Filtragem**

* Permita a filtragem por atributos comuns (por exemplo, título, autor, gênero):

`GET /books?title=harry&author=rowling`

**Teste da paginação e da filtragem**

* Valide se a paginação e a filtragem funcionam conforme o esperado usando casos de teste de API.  
* **Níveis de maturidade**:  
  * **Básico**: Suporta paginação e filtragem básicas.  
  * **Crescente**: Garantir um comportamento consistente em todos os pontos de extremidade.  
  * **Dimensionamento**: Otimizar o desempenho para grandes conjuntos de dados.  
  * **Inovação**: Filtragem inteligente e suporte a consultas preditivas.

---

**9\. Teste e validação**  
**Validação automatizada**

* Use ferramentas como o Spectral para validar as especificações da OpenAPI quanto à integridade e à consistência.

**Teste de erros**

* Teste cenários de erro para todos os endpoints para garantir respostas adequadas e mensagens de erro acionáveis.

**Teste de conformidade com a OWASP**

* Teste as APIs em relação aos 10 principais riscos de segurança de API da OWASP:  
  * **API6:2023 \- Acesso irrestrito a fluxos de negócios confidenciais**: Valide as restrições de acesso adequadas.  
  * **API7:2023 \- Falsificação de solicitação do lado do servidor (SSRF)**: Validar entradas e respostas para evitar vulnerabilidades de SSRF.  
  * **API2:2023 \- Autenticação quebrada**: Teste a expiração de tokens, fluxos de trabalho de atualização e tratamento de erros.

---

**10\. Refinamento e validação do Guia de estilo da API**  
**Revisão e feedback**

* Realize revisões periódicas do guia de estilo com equipes multifuncionais (produto, engenharia, conformidade).  
* Obtenha feedback dos consumidores da API para resolver problemas de usabilidade.

**Controle de versões**

* Mantenha o guia de estilo em um repositório com controle de versão para acompanhar as alterações e garantir o alinhamento da equipe.

**Integração com fluxos de trabalho de desenvolvimento**

* Incorporar os princípios do guia de estilo nas ferramentas de linting de API e nos pipelines de CI/CD.  
* Valide regularmente as especificações da OpenAPI em relação ao guia usando ferramentas automatizadas como o Spectral.

