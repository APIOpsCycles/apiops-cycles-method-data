**Lista de verificação da API REST**

**O conceito está pronto quando...**

| Critérios | OWASP API Top 10 | OpenAPI 3.1.x |
| ----- | ----- | ----- |
| A API é baseada em necessidades comerciais claras | API9:2019 | ❌ |
| A API oculta dados brutos de backend; projetada para uso compartilhado | API6:2023 | ❌ |
| Os pontos de extremidade têm valor comercial e descrições de recursos | API9:2023 | ✅ (via descrição) |
| O design da API é consistente com outras APIs | API8:2023, API9:2023 | ❌ |
| A nomenclatura de dados/atributos usa o inglês descritivo | \- | ❌ |
| Os campos obrigatórios são especificados | API6:2019 | ✅ (via obrigatória) |
| As datas usam o formato ISO com fuso horário | API8:2019 | ✅ (via format: date-time) |
| Os dados gerais usam valores padrão (por exemplo, ISO) | API6:2023, API8:2019 | (via enum, formato, padrão) |
| Nomes de campos evitam acrônimos, usam palavras completas | API9:2023 | ❌ |
| A criação de novos recursos retorna identificadores | API2:2023 | (via esquema de resposta/exemplo) |

---

**O protótipo de design da API estará pronto quando...**

| Critérios | OWASP API Top 10 | OpenAPI 3.1.x |
| ----- | ----- | ----- |
| Todos os itens da lista de verificação de conceitos são auditados | – | ❌ |
| Os caminhos de endpoint contêm no máximo dois recursos/sub-recursos | \- | ❌ |
| Os pontos de extremidade e os atributos incluem exemplos | \- | ✅ (via exemplo, exemplos) |
| POST é usado para criar/atualizar (não PUT, a menos que esteja completo) | \- | ❌ |
| DELETE é usado para remover recursos | \- | ❌ |
| Estratégia de controle de versão decidida; suportada pelo gateway | API9:2023 | ❌ |
| GET não tem corpo de solicitação; retorna 200 OK com conteúdo | \- | ➖ (convenção; não aplicada) |
| GET retorna 204 se o corpo da resposta estiver vazio | \- | (pode definir a resposta 204\) |
| POST retorna 200 OK ao atualizar | \- | (pode definir códigos de status) |
| O POST retorna 201 Created with ID on create | \- | ✅ |
| DELETE retorna 204 OK em caso de sucesso | \- | ✅ |
| Erros 400 fornecem informações de erro específicas | API6:2023 | (descrito no esquema de resposta) |
| 401 Não autorizado para credenciais incorretas | API2:2023 | ✅ (documentação de resposta padrão) |
| 403 Forbidden para operações não autorizadas | API5:2023 | ✅ |

---

**A API é passível de manutenção na produção quando...**

| Critérios | OWASP API Top 10 | OpenAPI 3.1.x |
| ----- | ----- | ----- |
| Todos os itens de protótipo/design auditados | \- | ❌ |
| Publicado via gerenciamento de API | API10:2019, API8:2023 | ❌ |
| Visível no portal do desenvolvedor | API9:2023 | ❌ |
| Acessível somente via gateway de API | API9:2023, API8:2023 | ❌ |
| Limites de taxa são impostos | API4:2023 | ❌ |
| Documentos gerados automaticamente a partir de especificações/esquemas | API9:2023 | ✅ |
| Atualização automática da especificação no gateway/portal de desenvolvimento | API9:2023 | ✅ (indireto por meio de ferramentas) |
| Especificação validada em cada alteração | \- | (prática recomendada) |
| A especificação contém o esquema de solicitação/resposta | \- | ✅ |
| O esquema e os exemplos são aprovados na validação | \- | ✅ |
| Usa HTTPS ou protocolos criptografados | API10:2023 | ❌ |
| Publicado sob o domínio oficial da organização | API8:2023 | ❌ |
| Pontos de extremidade protegidos por autenticação | API2:2023, API4:2023 | ➖ (pode definir securitySchemes) |
| Autenticação baseada em token | \- | ✅ (via securitySchemes) |
| Protegido contra CSRF | API8:2023 | ❌ |
| Entradas validadas automaticamente pela estrutura | API8:2023 | ✅ (indireto via schema) |
| Saídas auto-escapadas pela estrutura | API8:2023 | ❌ |
| Criptografia para dados em trânsito/armazenamento | API8:2023 | ❌ |
| Integridade da mensagem implementada | API6:2023, API7:2023 | ❌ |
| UUIDs/pseudo-identificadores em vez de IDs de banco de dados | API7:2023 | ➖ (recomendado no exemplo) |
| Não há dados confidenciais em URLs | API7:2023 | ❌ |
| Métodos HTTP somente para os recursos pretendidos | API5:2023 | ✅ (definido em caminhos) |

**Lista de verificação da API do ASync**  
**O conceito está pronto quando...**

| Critério | AsyncAPI 2.x |
| ----- | ----- |
| A API é baseada em necessidades comerciais claras | ❌ |
| A API oculta dados brutos de backend; foi projetada para uso compartilhado | ❌ |
| A API tem uma descrição que explica seu valor comercial e seus recursos | ✅ |
| A API tem um design consistente com nossas outras APIs | ❌ |
| A API e a nomenclatura de dados usam um bom inglês (ou outro idioma padrão) | ❌ |
| Os campos obrigatórios são especificados | ✅ |
| As datas estão no formato de data padrão ISO, incluindo o fuso horário | ✅ |
| Os dados gerais usam valores padrão (por exemplo, ISO) | ➖ |
| Os campos são descritos por extenso, evitando acrônimos | ❌ |
| Ao publicar novas mensagens, os tópicos ou canais relevantes são claramente identificados | ✅ |

---

**O protótipo de design da API estará pronto quando...**

| Critério | AsyncAPI 2.x |
| ----- | ----- |
| Todos os itens da lista de verificação de conceito são auditados | ❌ |
| O design da mensagem contém uma estrutura clara (eventos, comandos, consultas) | ✅ |
| Todas as mensagens e atributos incluem exemplos | ✅ |
| As mensagens seguem uma estrutura consistente entre tópicos/canais | ✅ |
| A estratégia de controle de versão da mensagem foi decidida | ❌ |
| As confirmações de mensagens recebidas são definidas (se aplicável) | ✅ |
| Erros ou problemas com mensagens incluem informações de erro específicas | ✅ |
| As estratégias de autenticação e autorização são especificadas | ➖ |

---

**🚀 A API pode ser mantida em produção quando...**

| Critério | AsyncAPI 2.x |
| ----- | ----- |
| Todos os itens das listas de verificação do protótipo e do projeto da API são auditados | ❌ |
| A API é gerenciada por meio de uma ferramenta adequada de gerenciamento da AsyncAPI | ❌ |
| A API está visível em um portal do desenvolvedor | ❌ |
| Os limites de taxa são aplicados ao enviar mensagens (se aplicável) | ❌ |
| A documentação da API é gerada automaticamente a partir da especificação da AsyncAPI | ✅ |
| A especificação é atualizada automaticamente nas ferramentas e no portal da API | ✅ |
| A especificação de tópicos/canais é validada a cada alteração | ✅ |
| A especificação contém o esquema para as mensagens | ✅ |
| O esquema de mensagens e os exemplos são aprovados na validação do esquema | ✅ |
| O transporte de mensagens garante a segurança (por exemplo, MQTT/AMQP sobre TLS) | ❌ |
| A API é operada sob o domínio oficial da organização | ❌ |
| Todos os tópicos/canais são protegidos por autenticação | ➖ |
| A API tem autenticação baseada em token | ✅ |
| A criptografia de dados em trânsito e no armazenamento é implementada conforme necessário | ❌ |
| A integridade da mensagem foi implementada conforme necessário | ❌ |
| UUIDs ou pseudoidentificadores são usados em vez de IDs de banco de dados | ➖ |
| Informações confidenciais não são expostas em tópicos ou canais | ❌ |
| A lista de permissões é usada para especificar quais clientes podem publicar/assinar | ✅ |

