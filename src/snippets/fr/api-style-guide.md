# **Principes de conception des API**

Guide concis sur la facilité d'utilisation, la découvrabilité et la cohérence des API, fondé sur des philosophies de conception éprouvées et les besoins des utilisateurs.

**Résultats**

* Meilleure compréhension des principes de conception des API

**Fonctionnement**  
**Étapes**

1. **Conception axée sur le consommateur :** commencez chaque cycle APIOps en recueillant les objectifs des utilisateurs et les termes propres au domaine afin que les API résolvent des problèmes concrets.  
2. **Nomenclature et comportement cohérents :** appliquez des conventions communes pour les ressources, les erreurs et les formats afin de rendre les API prévisibles.  
3. **Basé sur des contrats :** capturez l'interface avec OpenAPI ou AsyncAPI avant le codage afin d'aligner les équipes et de permettre l'automatisation.  
4. **Facilité d'utilisation et découvrabilité :** fournissez une documentation claire et des exemples afin que les développeurs comprennent rapidement comment utiliser l'API.  
5. **Itérez en toute sécurité :** faites évoluer les conceptions par petites incréments versionnés afin que les changements ne perturbent pas les consommateurs existants.

Conseil

* Personnalisez les principes de conception des API pour votre domaine  
* Utilisez-les de manière collaborative entre les rôles commerciaux et techniques

**Guide de style API**

Ce guide présente les meilleures pratiques et les normes en matière de conception et de mise en œuvre d'API RESTful afin de garantir la sécurité, la cohérence, la facilité d'utilisation et l'alignement sur les objectifs de l'organisation. Il est également conforme à la liste de contrôle d'audit des API.  
---

**1\. Sécurité et confidentialité**  
**Application du protocole HTTPS**

* Toutes les API doivent appliquer le protocole HTTPS pour crypter les données en transit.  
* Les informations sensibles (par exemple, les jetons, les identifiants, les données personnelles) ne doivent jamais être transmises dans des URL ou des paramètres de requête. Utilisez le corps de la requête pour ces données.

**Contrôle d'accès basé sur les rôles (RBAC)**

* Implémentez le RBAC à l'aide de fournisseurs d'identité et appliquez les autorisations dans la logique de l'API.  
* Documentez les contrôles d'accès spécifiques aux rôles dans la documentation de l'API.  
* **Niveaux de maturité** :  
  * **Fondamental** : les rôles sont définis et l'accès est appliqué manuellement.  
  * **En développement** : les fournisseurs d'identité sont intégrés.  
  * **Évolutif** : vérifications dynamiques des rôles en fonction des consommateurs de l'API.  
  * **Innovant** : application automatisée et basée sur des politiques du modèle RBAC.

**Conformité à la sécurité des API OWASP**

* Répondez aux 10 principaux risques de sécurité des API OWASP, notamment :  
  * **API6:2023 – Accès illimité aux flux métier sensibles** : restreignez les flux métier sensibles à l'aide d'une authentification et d'une autorisation appropriées.  
  * **API7:2023 – Falsification de requêtes côté serveur (SSRF)** : validez les entrées et nettoyez les réponses pour éviter les vulnérabilités SSRF.  
  * **API2:2023 – Authentification défaillante** : garantissez des mécanismes d'authentification robustes (par exemple, OAuth 2.0) et validez les workflows d'expiration des jetons.

**Chiffrement au repos**

* Les données sensibles stockées dans des bases de données doivent être chiffrées au repos à l'aide d'algorithmes conformes aux normes de l'industrie.  
* Vérifiez qu'aucune donnée sensible n'apparaît dans les journaux ou les URL.

---

**2\. Méthodes HTTP**  
**Utilisation standard**

* Utilisez les méthodes HTTP de manière cohérente :  
  * GET : récupérer des données sans modifier l'état du serveur.  
  * POST : créer de nouvelles ressources ou déclencher des opérations côté serveur.  
  * PUT : mettre à jour des ressources existantes (utiliser des charges utiles complètes).  
  * PATCH : mettre à jour partiellement une ressource existante.  
  * DELETE : supprime une ressource.

**Idempotence**

* Assurez-vous que les méthodes PUT, PATCH et DELETE sont idempotentes, ce qui signifie que plusieurs requêtes identiques aboutissent au même état.

**Test des méthodes HTTP**

* Validez toutes les méthodes HTTP à l'aide de tests d'intégration afin de garantir leur conformité avec le comportement attendu.

---

**3\. Gestion des erreurs et réponses**  
**Format d'erreur standardisé**

* Toutes les API doivent renvoyer les erreurs dans un format standardisé. Exemple :

`{`  
 `« error » : « invalid_request »,`  
 `"message": "La requête manque un paramètre obligatoire.",`  
 `"details": [`  
    
`« Le paramètre « user_id » est obligatoire. »`  
 `]`  
`}`

**Descriptions détaillées**

* Incluez des messages d'erreur lisibles par l'utilisateur afin d'aider les développeurs à déboguer les problèmes.  
* Assurez-vous que les codes d'erreur et les descriptions sont conformes à la spécification OpenAPI.

**Codes d'état HTTP**

* Utilisez les codes d'état appropriés pour chaque opération :  
  * 200 OK : opérations GET, PUT ou PATCH réussies.  
  * 201 Créé : opération POST réussie ayant abouti à une nouvelle ressource.  
  * 204 No Content : opération DELETE réussie.  
  * 400 Bad Request : entrée non valide ou paramètres manquants.  
  * 401 Non autorisé : échec de l'authentification.  
  * 403 Accès refusé : autorisations insuffisantes.  
  * 404 Not Found : Ressource introuvable.  
  * 429 Trop de requêtes : limite de fréquence dépassée.

**Test des scénarios d'erreur**

* Validez tous les scénarios d'erreur afin de garantir des réponses appropriées et des messages d'erreur exploitables.  
* **Niveaux de maturité** :  
  * **Fondamental** : gestion de base des erreurs pour les scénarios principaux.  
  * **En développement** : messages d'erreur détaillés pour tous les points de terminaison.  
  * **Évolutif** : validation automatisée des erreurs à l'aide d'outils de test.  
  * **Innovant** : informations basées sur l'IA pour les modèles d'erreurs et les prévisions.

---

**4\. Documentation et expérience développeur**  
**Documentation interactive**

* Génération de la documentation API à l'aide de la spécification OpenAPI (dernière version prise en charge).  
* Incluez des exemples pour tous les points de terminaison afin d'illustrer les workflows de requête/réponse.  
* **Niveaux de maturité** :  
  * **Fondamental** : documentation statique avec exemples.  
  * **En développement** : documentation interactive générée automatiquement.  
  * **Évolutif** : outils de développement pour tester l'API.  
  * **Innovant** : environnements de développement intégrés pour les tests.

**Section « Pour commencer »**

* Fournissez une section « Pour commencer » dans la documentation afin de guider les nouveaux utilisateurs à travers l'authentification, les workflows courants et les tests des points de terminaison.  
* Utilisez le modèle de guide de démarrage comme référence.

**Environnement sandbox**

* Proposez un environnement sandbox qui reproduit les schémas de production et les codes d'erreur à des fins de test.  
* Validez l'alignement du bac à sable à l'aide de tests d'audit API.

---

**5\. Conventions et normes de dénomination**  
**Dénomination des ressources**

* Utilisez des termes anglais descriptifs et conformes aux normes de l'industrie pour nommer les ressources (par exemple, livres, utilisateurs, prêts).  
* Évitez les termes ambigus tels que « type » ou « statut » sans contexte supplémentaire.

**Dénomination des attributs**

* Utilisez la casse camelCase pour les noms d'attributs (par exemple, userId, bookTitle).  
* Évitez les acronymes et les abréviations afin de garantir la clarté.  
* Validez les conventions de dénomination lors de la validation OpenAPI.

---

**6\. Localisation et internationalisation**  
**Accepter les en-têtes**

* Prise en charge de la localisation à l'aide de l'en-tête Accept-Language pour les réponses API.  
* Fournissez des chaînes localisées et assurez-vous que tous les messages d'erreur peuvent être traduits.

**Formats de date et d'heure**

* Utilisez le format ISO 8601 pour tous les champs de date et d'heure, y compris les fuseaux horaires.

**Test de la localisation**

* Validez les réponses et les messages d'erreur localisés à l'aide de tests fonctionnels.

---

**7\. Gestion des versions et dépréciation**  
**Stratégie de gestion des versions**

* Utilisez un système de versionnement sémantique (par exemple, /v1, /v2) pour indiquer les changements majeurs.  
* Évitez les modifications importantes au sein d'une même version. Signalez les anciens points de terminaison obsolètes suffisamment à l'avance.

**Avis de dépréciation**

* Communiquez les dépréciations via le portail des développeurs et incluez des en-têtes dans les réponses API :

`Obsolescence : true`  
`Date de fin : 01/01/2025`  
`Lien : &lt;https://developer.portal.com/docs/deprecation&gt;; rel="deprecation"`  
---

**8\. Pagination et filtrage**  
**Pagination**

* Utilisez les paramètres de pagination standard :  
  * page : numéro de la page actuelle.  
  * limite : nombre d'éléments par page.

**Filtrage**

* Autorisez le filtrage par attributs courants (par exemple, titre, auteur, genre) :

`GET /books?title=harry&amp;author=rowling`

**Test de la pagination et du filtrage**

* Vérifiez que la pagination et le filtrage fonctionnent comme prévu à l'aide de cas de test API.  
* **Niveaux de maturité** :  
  * **Fondamental** : prend en charge la pagination et le filtrage de base.  
  * **En développement** : assurez un comportement cohérent entre les points de terminaison.  
  * **Évolutif** : optimiser les performances pour les grands ensembles de données.  
  * **Innovant** : filtrage intelligent et prise en charge des requêtes prédictives.

---

**9\. Test et validation**  
**Validation automatisée**

* Utilisez des outils tels que Spectral pour valider l'exhaustivité et la cohérence des spécifications OpenAPI.

**Test des erreurs**

* Testez les scénarios d'erreur pour tous les points de terminaison afin de garantir des réponses appropriées et des messages d'erreur exploitables.

**Test de conformité OWASP**

* Testez les API par rapport aux 10 principaux risques de sécurité API de l'OWASP :  
  * **API6:2023 – Accès illimité aux flux commerciaux sensibles** : validez les restrictions d'accès appropriées.  
  * **API7:2023 – Falsification de requêtes côté serveur (SSRF)** : validez les entrées et les réponses pour éviter les vulnérabilités SSRF.  
  * **API2:2023 – Authentification défaillante** : testez l'expiration des jetons, les workflows de rafraîchissement et la gestion des erreurs.

---

**10\. Affiner et valider le guide de style API**  
**Révision et commentaires**

* Réalisez des révisions périodiques du guide de style avec des équipes interfonctionnelles (produit, ingénierie, conformité).  
* Recueillez les commentaires des utilisateurs de l'API afin de répondre aux préoccupations en matière de convivialité.

**Contrôle des versions**

* Conservez le guide de style dans un référentiel contrôlé par version afin de suivre les modifications et d'assurer la cohérence entre les équipes.

**Intégration aux workflows de développement**

* Intégrez les principes du guide de style dans les outils de linting des API et les pipelines CI/CD.  
* Validez régulièrement les spécifications OpenAPI par rapport au guide à l'aide d'outils automatisés tels que Spectral.

