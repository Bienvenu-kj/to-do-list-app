# refactor(notifications): harmoniser le service de notifications

- harmonise en anglais l’état et les méthodes de notification
- met à jour les composants consommateurs
- supprime le constructeur et le `Subject` inutilisés
- corrige la valeur du dimanche retournée par `Date.getDay()`
