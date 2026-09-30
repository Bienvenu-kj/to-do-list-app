import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class FormManagerService {
  isFormVisible = signal(false);

  isEditingTask = signal(false);

  showForm(): void {
    this.isFormVisible.set(true);
  }

  startTaskEditing(): void {
    this.isEditingTask.set(true);
  }

  resetFormState(): void {
    this.isEditingTask.set(false);
    this.isFormVisible.set(false);
  }

  isNotificationDateValid(notificationDate: string): boolean {
    const date = new Date(notificationDate);
    const notificationTime = date.getTime();
    const now = new Date().getTime();

    if (notificationTime > now) {
      return true;
    }

    if (notificationTime === now) {
      alert(
        'La date que vous avez mis est egalement à ce moment ! veillez choisir un temps qui est un peu en avant !',
      );
    } else {
      alert(
        'Vous avez mis une date qui est déjà passée, notification non mise en place, modifier votre tache pour tenter la mettre !',
      );
    }

    return false;
  }
}
