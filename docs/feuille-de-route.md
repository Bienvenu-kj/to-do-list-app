# Feuille de route du projet

Cette feuille de route organise les prochaines améliorations du projet dans un ordre progressif. L’objectif est de moderniser l’application sans effacer son histoire ni les étapes d’apprentissage qu’elle représente.

## 1. Améliorer l’architecture Angular

- [x] Harmoniser les noms actuellement mélangés entre le français et l’anglais.
- [x] Renommer l’interface `Taches` en `Tache` ou `Task`.
- [ ] Rendre obligatoires les propriétés indispensables, notamment `id` et `etat`.
- [ ] Remplacer les chaînes libres représentant l’état d’une tâche par un type strict.
- [ ] Clarifier les responsabilités des composants et des services.
- [ ] Extraire la gestion de `localStorage` dans un service dédié.
- [ ] Centraliser les opérations d’ajout, de modification, de suppression et de changement d’état.
- [ ] Utiliser les `signal` et `computed` de manière cohérente, sans modifier directement leurs tableaux.
- [ ] Remplacer les manipulations directes du DOM par les mécanismes Angular appropriés.
- [ ] Nettoyer correctement les écouteurs d’événements lors de la destruction des composants.
- [ ] Supprimer les imports, propriétés et méthodes inutilisés.
- [ ] Améliorer les gardes de navigation et retourner des redirections Angular plutôt que déclencher une navigation dans les gardes.

## 2. Sécuriser la gestion des tâches

- [x] Corriger la sauvegarde de la liste après la suppression d’une tâche terminée.
- [x] Corriger la sauvegarde de la liste après la modification d’une tâche terminée.
- [ ] Remplacer la génération d’identifiants fondée sur `taches.length + 1` afin d’éviter les doublons.
- [ ] Gérer explicitement le cas où une tâche recherchée n’existe pas.
- [ ] Remplacer les mutations directes avec `splice()` par la création de nouveaux tableaux.
- [ ] Valider les données lues depuis `localStorage` avant de les utiliser.
- [ ] Éviter de relire inutilement le stockage après chaque modification.
- [ ] Prévenir la corruption ou la perte accidentelle des tâches enregistrées.

## 3. Stabiliser l’environnement de développement

- [ ] Utiliser une version LTS de Node.js compatible avec Angular 19.
- [x] Remplacer l’ancien script `ng build --prod` par une configuration moderne.
- [x] Ajouter des scripts explicites pour le build de production et les tests automatisés.
- [ ] Vérifier que `npm start`, `npm run build`, `npm run build:prod` et `npm test` fonctionnent de manière reproductible.
- [ ] Vérifier et corriger la commande de déploiement GitHub Pages.
- [ ] Rendre l’exécution de Chrome Headless fiable dans l’environnement de test.

## 4. Construire un socle de tests

- [ ] Tester l’ajout d’une tâche.
- [ ] Tester la modification d’une tâche terminée et non terminée.
- [ ] Tester la suppression d’une tâche terminée et non terminée.
- [ ] Tester le passage d’une tâche à l’état terminé puis son retour à l’état non terminé.
- [ ] Tester la génération et l’unicité des identifiants.
- [ ] Tester la persistance des données après rechargement.
- [ ] Tester la recherche sans tenir compte de la casse.
- [ ] Tester les opérations demandées sur une tâche inexistante.
- [ ] Ajouter progressivement des tests de composants pour les parcours importants.

## 5. Revoir les notifications et la PWA

- [ ] Auditer `sw.js` et `register-sw.js`.
- [ ] Déterminer si les rappels doivent fonctionner uniquement lorsque l’application reste ouverte ou persister après sa fermeture.
- [ ] Adapter l’architecture des notifications au comportement retenu.
- [ ] Gérer correctement les permissions et les refus de notification.
- [ ] Prévoir un comportement clair pour les navigateurs incompatibles.
- [ ] Vérifier l’installation de la PWA et son fonctionnement hors connexion.
- [ ] Tester le comportement des rappels après un rechargement ou un redémarrage du navigateur.

## 6. Améliorer l’expérience utilisateur

- [ ] Remplacer progressivement les appels à `alert()` par des messages intégrés à l’interface.
- [ ] Ajouter des retours de succès, d’erreur et de confirmation.
- [ ] Améliorer les états vides des différentes listes.
- [ ] Ajouter le tri et les filtres prévus dans le README.
- [ ] Rendre le menu contextuel utilisable au clavier et sur écran tactile.
- [ ] Vérifier l’accessibilité des formulaires, des boutons et des listes.
- [ ] Améliorer l’affichage responsive.
- [ ] Harmoniser les couleurs, les espacements et les styles SCSS.

## 7. Moderniser progressivement le projet

- [ ] Conserver les éléments qui témoignent du parcours d’apprentissage.
- [ ] Éviter une réécriture complète et privilégier des refactorisations limitées et vérifiables.
- [ ] Créer des commits courts, cohérents et centrés sur une seule intention.
- [ ] Documenter les décisions d’architecture importantes.
- [ ] Vérifier le build et les tests après chaque étape significative.

## 8. Finaliser la documentation et la présentation

- [ ] Réécrire le README et supprimer les répétitions actuelles.
- [ ] Présenter le contexte de la formation Malakisi et l’évolution du projet.
- [ ] Décrire clairement les fonctionnalités, l’architecture et les choix techniques.
- [ ] Ajouter des captures d’écran ou une démonstration.
- [ ] Documenter l’installation, les commandes npm et le déploiement.
- [ ] Fiabiliser la publication sur GitHub Pages.
- [ ] Présenter le projet comme une démonstration concrète de progression technique.
