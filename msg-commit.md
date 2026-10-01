# refactor(tasks): renforcer le modèle de tâche

- remplace `etat` par un statut anglais strictement typé
- rend obligatoires l’identifiant et le statut des tâches enregistrées
- sépare les données du formulaire avec le type `TaskInput`
- migre et valide les anciennes tâches stockées localement
- sécurise les identifiants et les opérations du gestionnaire de tâches
- actualise l’avancement de la feuille de route
