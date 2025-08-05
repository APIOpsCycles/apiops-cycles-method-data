**Liste de contrôle pour l'API REST**

**✅ Le concept est prêt lorsque...**

| Critères | Top 10 des API OWASP | OpenAPI 3.1.x |
| ----- | ----- | ----- |
| L'API est basée sur des besoins commerciaux clairs | API9:2019 | ❌ |
| L'API masque les données brutes du backend ; conçue pour une utilisation partagée | API6:2023 | ❌ |
| Les points de terminaison ont une valeur commerciale et sont accompagnés d'une description des fonctionnalités | API9:2023 | ✅ (via la description) |
| La conception de l'API est cohérente avec les autres API | API8:2023, API9:2023 | ❌ |
| Les noms des données/attributs utilisent un anglais descriptif | – | ❌ |
| Les champs obligatoires sont spécifiés | API6:2019 | ✅ (via obligatoire) |
| Les dates utilisent le format ISO avec le fuseau horaire | API8:2019 | ✅ (via format : date-heure) |
| Les données générales utilisent des valeurs standard (par exemple, ISO) | API6:2023, API8:2019 | ➖ (via énumération, format, modèle) |
| Les noms de champs évitent les acronymes et utilisent des mots complets | API9:2023 | ❌ |
| La création de nouvelles ressources renvoie des identifiants | API2:2023 | ✅ (via schéma de réponse/exemple) |

---

**🧪 Le prototype de conception de l'API est prêt lorsque...**

| Critères | OWASP API Top 10 | OpenAPI 3.1.x |
| ----- | ----- | ----- |
| Tous les éléments de la liste de contrôle conceptuelle ont été vérifiés | – | ❌ |
| Les chemins d'accès aux points de terminaison contiennent au maximum deux ressources/sous-ressources | – | ❌ |
| Les points de terminaison et les attributs comprennent des exemples | – | ✅ (via exemple, exemples) |
| POST est utilisé pour créer/mettre à jour (pas PUT sauf si complet) | – | ❌ |
| DELETE est utilisé pour supprimer des ressources | – | ❌ |
| Stratégie de gestion des versions définie ; prise en charge par la passerelle | API9:2023 | ❌ |
| GET n'a pas de corps de requête ; renvoie 200 OK avec le contenu | – | ➖ (convention ; non appliquée) |
| GET renvoie 204 si le corps de la réponse est vide | – | ✅ (peut définir une réponse 204\) |
| POST renvoie 200 OK lors de la mise à jour | – | ✅ (peut définir des codes d'état) |
| POST renvoie 201 Créé avec ID lors de la création | – | ✅ |
| DELETE renvoie 204 OK en cas de succès | – | ✅ |
| Les erreurs 400 fournissent des informations spécifiques sur l'erreur | API6:2023 | ✅ (décrit dans le schéma de réponse) |
| 401 Non autorisé pour des informations d'identification incorrectes | API2:2023 | ✅ (documentation de réponse standard) |
| 403 Accès interdit pour opérations non autorisées | API5:2023 | ✅ |

---

**🚀 L'API est maintenable en production lorsque...**

| Critères | OWASP API Top 10 | OpenAPI 3.1.x |
| ----- | ----- | ----- |
| Tous les éléments de prototype/conception ont été audités | – | ❌ |
| Publié via la gestion des API | API10:2019, API8:2023 | ❌ |
| Visible dans le portail développeur | API9:2023 | ❌ |
| Accessible uniquement via la passerelle API | API9:2023, API8:2023 | ❌ |
| Limites de débit appliquées | API4:2023 | ❌ |
| Documents générés automatiquement à partir des spécifications/schémas | API9:2023 | ✅ |
| Spécifications mises à jour automatiquement vers le portail gateway/dev | API9:2023 | ✅ (indirect via l'outil) |
| Spécifications validées à chaque modification | – | ✅ (meilleure pratique) |
| La spécification contient le schéma de requête/réponse | – | ✅ |
| Le schéma et les exemples passent la validation | – | ✅ |
| Utilise HTTPS ou des protocoles cryptés | API10:2023 | ❌ |
| Publié sous le domaine officiel de l'organisation | API8:2023 | ❌ |
| Points de terminaison protégés par authentification | API2:2023, API4:2023 | ➖ (peut définir des schémas de sécurité) |
| Authentification par jeton | – | ✅ (via securitySchemes) |
| Protégé contre les attaques CSRF | API8:2023 | ❌ |
| Entrées validées automatiquement par le framework | API8:2023 | ✅ (indirect via le schéma) |
| Sorties automatiquement échappées par le framework | API8:2023 | ❌ |
| Chiffrement des données en transit/stockage | API8:2023 | ❌ |
| Intégrité des messages mise en œuvre | API6:2023, API7:2023 | ❌ |
| UUID/pseudo-identificateurs à la place des identifiants de base de données | API7:2023 | ➖ (recommandé dans l'exemple) |
| Aucune donnée sensible dans les URL | API7:2023 | ❌ |
| Méthodes HTTP uniquement pour les ressources prévues | API5:2023 | ✅ (défini dans les chemins d'accès) |

**Liste de contrôle de l'API asynchrone**  
**✅ Le concept est prêt lorsque...**

| Critère | AsyncAPI 2.x |
| ----- | ----- |
| L'API est basée sur des besoins métier clairs | ❌ |
| L'API masque les données brutes du backend ; elle est conçue pour une utilisation partagée | ❌ |
| L'API est accompagnée d'une description qui explique sa valeur commerciale et ses fonctionnalités | ✅ |
| L'API présente une conception cohérente avec nos autres API | ❌ |
| La dénomination de l'API et des données utilise un anglais correct (ou une autre langue standard) | ❌ |
| Les champs obligatoires sont spécifiés | ✅ |
| Les dates sont au format ISO standard, y compris le fuseau horaire | ✅ |
| Les données générales utilisent des valeurs standard (par exemple, ISO) | ➖ |
| Les champs sont décrits en mots complets, en évitant les acronymes | ❌ |
| Lors de la publication de nouveaux messages, les sujets ou canaux pertinents sont clairement identifiés | ✅ |

---

**🧪 Le prototype de conception de l'API est prêt lorsque...**

| Critère | AsyncAPI 2.x |
| ----- | ----- |
| Tous les éléments de la liste de contrôle du concept sont vérifiés | ❌ |
| La conception des messages présente une structure claire (événements, commandes, requêtes) | ✅ |
| Tous les messages et attributs comprennent des exemples | ✅ |
| Les messages suivent une structure cohérente entre les sujets/canaux | ✅ |
| Une stratégie de gestion des versions des messages a été définie | ❌ |
| Les accusés de réception des messages reçus sont définis (le cas échéant) | ✅ |
| Les erreurs ou problèmes liés aux messages comprennent des informations spécifiques sur les erreurs | ✅ |
| Les stratégies d'authentification et d'autorisation sont spécifiées | ➖ |

---

**🚀 L'API est maintenable en production lorsque...**

| Critère | AsyncAPI 2.x |
| ----- | ----- |
| Tous les éléments des listes de contrôle du prototype et de la conception de l'API sont vérifiés | ❌ |
| L'API est gérée via un outil de gestion AsyncAPI approprié | ❌ |
| L'API est visible dans un portail développeur | ❌ |
| Les limites de débit sont appliquées lors de l'envoi de messages (le cas échéant) | ❌ |
| La documentation de l'API est générée automatiquement à partir de la spécification AsyncAPI | ✅ |
| La spécification est automatiquement mise à jour dans les outils API et le portail | ✅ |
| La spécification des sujets/canaux est validée à chaque modification | ✅ |
| La spécification contient le schéma des messages | ✅ |
| Le schéma des messages et les exemples passent la validation du schéma | ✅ |
| Le transport des messages garantit la sécurité (par exemple, MQTT/AMQP sur TLS) | ❌ |
| L'API est exploitée sous le domaine officiel de l'organisation | ❌ |
| Tous les sujets/canaux sont protégés par authentification | ➖ |
| L'API dispose d'une authentification par jeton | ✅ |
| Le chiffrement des données en transit et en stockage est mis en œuvre selon les besoins | ❌ |
| L'intégrité des messages a été mise en œuvre selon les besoins | ❌ |
| Des UUID ou des pseudo-identifiants sont utilisés à la place des identifiants de base de données | ➖ |
| Les informations sensibles ne sont pas exposées dans les sujets ou les canaux | ❌ |
| Une liste blanche est utilisée pour spécifier les clients autorisés à publier/s'abonner | ✅ |

