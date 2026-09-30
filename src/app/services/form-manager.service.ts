import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class FormManagerService {
  viewForm = signal(false);

  /*/ 
  utilisée pour reunitialiser (false) le
  champs de saisie lors de l'ajout d'une tache ou
  pour le preremplire (true) lors de la modification d'une tâche
  elle est partagé à l'enfant task-form.component pour ça. 
  /*/
  needToModifyAtask = signal(false);
  needToAddNewTask = signal(false);
  constructor() {}

  onViewingForm() {
    this.viewForm.set(true);
  }
  onModifyingTask() {
    this.needToModifyAtask.set(true);
  }
  onAddingtask() {
    this.needToAddNewTask.set(true);
  }
  actualiseModificateurs() {
    this.needToModifyAtask.set(false);
    this.needToAddNewTask.set(false);
    this.viewForm.set(false);
  }

  approuveLaDate(UserdataForNotification: string) {
    const date = new Date(UserdataForNotification);
    const notifDate = date.getTime();
    const now = new Date().getTime();
    let dateCorrect = false;
    if (notifDate > now) {
      dateCorrect = true;
    } else if (notifDate === now) {
      dateCorrect = false;
      alert(
        'La date que vous avez mis est egalement à ce moment ! veillez choisir un temps qui est un peu en avant !',
      );
    } else {
      dateCorrect = false;
      alert(
        'Vous avez mis une date qui est déjà passée, notification non mise en place, modifier votre tache pour tenter la mettre !',
      );
    }
    return dateCorrect;
  }
}
