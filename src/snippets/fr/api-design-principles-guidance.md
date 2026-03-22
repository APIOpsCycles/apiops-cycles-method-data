## Comment démarrer le travail de livraison de l'API en s'appuyant sur les phases précédentes (« étapes »)
Utilisez ces conseils au début de la `API Delivery` i.e. « livraison de l'API », une fois que le contrat API (par exemple OpenAPI) et les principaux livrables des étapes précédentes ont été examinés et acceptés.
L'objectif n'est pas de concevoir la mise en œuvre de manière isolée. L'objectif est de traduire les livrables convenus lors des étapes précédentes en une structure de code concrète, en règles de validation, en comportement d'exécution et en décisions relatives à la livraison du produit API.

---

### 1. Partez du contrat validé
- Considérez le contrat API validé comme le principal point de référence pour les décisions de mise en œuvre.
- Veillez à ce que le contrat et la mise en œuvre restent alignés tout au long de la livraison du produit API.
- Utilisez le contrat pour piloter la validation des requêtes, le mappage des réponses, la documentation et les tests.

---

### 2. Utilisez les résultats du domaine pour préserver le sens métier
- Utilisez les résultats du `Domain Canvas` pour guider la dénomination, la manière dont l'implémentation est divisée en responsabilités métier claires, et la manière dont les différents systèmes backend sont connectés sans exposer leurs différences.
- Préservez les significations validées des entités, des attributs, des statuts et des règles de source de vérité.
- Évitez de laisser transparaître des modèles spécifiques au backend ou des incohérences dans l'API publique.

---

### 3. Utilisez les résultats du parcours pour préserver les flux critiques
- Utilisez les résultats du `Customer Journey Canvas` pour identifier les flux utilisateur qu’il est le plus important de prendre en charge en priorité.
- Utilisez les résultats de l’`API Consumer Experience` pour que l’API reste compréhensible, prévisible et facile à intégrer.
- Laissez les priorités de parcours convenues déterminer quels chemins de mise en œuvre nécessitent la plus grande fiabilité, la latence la plus faible, les erreurs les plus claires et la plus forte concentration opérationnelle.

---

### 4. Utilisez les résultats de la proposition de valeur pour préserver la valeur pour le consommateur
- Utilisez les résultats du `API Value Proposition Canvas` pour que la mise en œuvre reste centrée sur les difficultés, les gains et les fonctionnalités de l’API convenus.
- Préservez les significations des champs, le comportement et les promesses qui ont rendu l’API précieuse lors des étapes précédentes.
- Assurez-vous que la gestion des erreurs, l’actualité des données et la nomenclature soutiennent à la fois l’expérience développeur visée et le cas d’utilisation métier.

---

### 5. Utilisez les résultats de l'architecture pour orienter les décisions d'exécution
- Utilisez les résultats du `Business Impact Canvas` pour orienter les décisions en matière de résilience, de délai d'expiration, de repli et de dégradation.
- Utilisez les résultats du `Locations Canvas` pour orienter les limites du réseau, les limites de confiance, les chemins d'accès et les contraintes de déploiement.
- Utilisez les résultats du `Capacity Canvas` pour orienter les limites de débit, la mise en cache, la mise à l'échelle et le comportement en cas de pic de charge.
- Utilisez les recommandations du `API Metrics And Analytics` pour déterminer ce qui doit être surveillé dès la première implémentation.

---

### 6. Utilisez les résultats de la conception des interactions et des protocoles pour définir la structure du code
- Utilisez les résultats du `Interaction Canvas` pour éviter d’implémenter trop tôt des styles d’interaction non pris en charge.
- Utilisez les résultats de conception `REST`, `Event` ou `GraphQL` pour définir le comportement spécifique au protocole en matière de requêtes, de réponses et de validation.
- Reflétez clairement le style d'interaction sélectionné dans la structure du code, les responsabilités et la stratégie de test.

---

### 7. Utilisez les résultats de l'audit pour améliorer la livraison avant que le codage n'aille trop loin
- Utilisez les conclusions de l'audit pour éliminer toute ambiguïté avant que la mise en œuvre ne se propage dans l'ensemble du code.
- Corrigez rapidement les règles de requête floues, les validations manquantes, les contrats d'erreur faibles et les lacunes opérationnelles.
- Considérez l'audit comme une boucle d'amélioration de la conception avant la mise en production, et non seulement comme une étape de décision finale.

---

### 8. Appliquez les recommandations, puis résumez
- Appliquez ces recommandations à l'API actuelle et au plan de mise en œuvre.
- Résumez les implications pour la structure du code, la validation des requêtes, l'intégration des sources, la sécurité, la surveillance et les alertes, ainsi que les tests.
- Ne créez pas d'artefact de livraison distinct, sauf si l'équipe ou l'utilisateur en a spécifiquement besoin.
