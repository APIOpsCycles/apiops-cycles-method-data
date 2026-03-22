## Como iniciar o trabalho de entrega da API com base nas fases anteriores (“etapas”)
Utilize estas orientações no início da `API Delivery` (entrega da API), após a revisão e aceitação do contrato da API (por exemplo, OpenAPI) e dos principais resultados das etapas anteriores.
O objetivo não é desenvolver a implementação de forma isolada. O objetivo é transformar os resultados acordados nas etapas anteriores em uma estrutura de código concreta, regras de validação, comportamento em tempo de execução e decisões relativas à entrega do produto API.

---

### 1. Comece a partir do contrato validado
- Trate o contrato de API validado como o principal ponto de referência para as decisões de implementação.
- Mantenha o contrato e a implementação alinhados ao longo de toda a entrega do produto API.
- Use o contrato para orientar a validação de solicitações, o mapeamento de respostas, a documentação e os testes.

---

### 2. Use os resultados do domínio para preservar o significado comercial
- Use os resultados do `Domain Canvas` para orientar a nomenclatura, como a implementação é dividida em responsabilidades comerciais claras e como diferentes sistemas de back-end são conectados sem expor suas diferenças.
- Preserve os significados validados de entidades, atributos, status e regras de fonte de verdade.
- Evite vazar modelos específicos do back-end ou inconsistências para a API pública.

---

### 3. Use os resultados da jornada para preservar fluxos críticos
- Use os resultados do `Customer Journey Canvas` para identificar quais fluxos de usuários são mais importantes para serem atendidos primeiro.
- Use os resultados da `API Consumer Experience` para manter a API compreensível, previsível e fácil de integrar.
- Deixe que as prioridades de jornada acordadas decidam quais caminhos de implementação precisam da maior confiabilidade, menor latência, erros mais claros e maior foco operacional.

---

### 4. Use os resultados da Proposta de Valor para preservar o valor para o consumidor
- Use os resultados do `API Value Proposition Canvas` para manter a implementação focada nas dores, ganhos e recursos da API acordados.
- Preserve os significados dos campos, o comportamento e as promessas que tornaram a API valiosa nas etapas anteriores.
- Garanta que o tratamento de erros, a atualização e a nomenclatura apoiem tanto a experiência do desenvolvedor pretendida quanto o caso de uso de negócios.

---

### 5. Use os resultados da arquitetura para moldar as decisões de tempo de execução
- Use os resultados do `Business Impact Canvas` para orientar as decisões sobre resiliência, tempo limite, fallback e degradação.
- Use os resultados do `Locations Canvas` para orientar os limites de rede, limites de confiança, caminhos de acesso e restrições de implantação.
- Use os resultados do `Capacity Canvas` para orientar limites de taxa, cache, escalonamento e comportamento em picos de carga.
- Use as orientações do `API Metrics And Analytics` para decidir o que deve ser observado desde a primeira implementação em diante.

---

### 6. Use os resultados do projeto de interação e protocolo para moldar a estrutura do código
- Use os resultados do `Interaction Canvas` para evitar implementar estilos de interação não suportados prematuramente.
- Use os resultados do projeto `REST`, `Event` ou `GraphQL` para moldar o comportamento de solicitação, resposta e validação específico do protocolo.
- Reflete o estilo de interação selecionado claramente na estrutura do código, nas responsabilidades e na estratégia de testes.

---

### 7. Usa os resultados da auditoria para melhorar a entrega antes que a codificação avance demais
- Usa as conclusões da auditoria para remover ambiguidades antes que a implementação se espalhe pela base de código.
- Corrige regras de solicitação pouco claras, validações ausentes, contratos de erro fracos e lacunas operacionais logo no início.
- Trate a auditoria como um ciclo de melhoria de projeto antes da produção, não apenas como uma etapa de decisão final.

---

### 8. Aplique as orientações e, em seguida, resuma
- Aplique estas orientações à API atual e ao plano de implementação.
- Resuma as implicações para a estrutura do código, validação de solicitações, integração de fontes, segurança, monitoramento e alertas, e testes.
- Não crie um artefato de entrega separado, a menos que a equipe ou o usuário precise especificamente de um.
