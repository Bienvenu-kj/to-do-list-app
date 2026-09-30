# fix(tasks): corriger la sauvegarde des tâches terminées

- enregistre la liste `tachesTerminees` après la suppression d’une tâche terminée
- enregistre également la bonne liste après la modification d’une tâche terminée
- évite d’écraser `finishedTasks` avec les tâches non terminées
- harmonise le formatage du service de gestion des tâches
