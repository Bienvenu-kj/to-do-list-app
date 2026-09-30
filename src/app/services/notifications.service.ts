import { Injectable, signal } from '@angular/core';
import { timer } from 'rxjs';

import { Task } from '../models/task.model';

@Injectable({
  providedIn: 'root',
})
export class NotificationsService {
  isFirstLogin = signal(false);
  userName = signal<string | undefined>('');

  setFirstLogin(state = false, username?: string): void {
    this.isFirstLogin.set(state);
    if (username) this.userName.set(username);
  }

  scheduleNotification(date: Date | number, task: Task): void {
    timer(date).subscribe({
      next: () => {
        new Notification(
          `Il est temps pour vous de faire votre tache : "${task.taskName}"`,
        );
      },
    });
  }

  getDayName(dayOfTheWeek: number): string {
    let dayName: string | null = null;
    switch (dayOfTheWeek) {
      case 1:
        dayName = 'Lundi';
        break;
      case 2:
        dayName = 'Mardi';
        break;
      case 3:
        dayName = 'Mercred';
        break;
      case 4:
        dayName = 'Jeudi';
        break;
      case 5:
        dayName = 'Vendredi';
        break;
      case 6:
        dayName = 'Samedi';
        break;
      case 0:
        dayName = 'Dimanche';
        break;
    }
    return dayName as string;
  }

  scheduleTaskNotification(task: Task): void {
    if (task.notification) {
      const date = new Date(task.notification);
      // on verifie si la date est bien correcte
      if (isNaN(date.getTime())) {
        console.log('Invalide date');
      } else {
        // on verifie si le navigateur supporte les notifications
        if (!('Notification' in window)) {
          console.log('Votre navigateur ne supporte pase les notifications');
          return;
        }
        // on demande la permission avant de continuer
        Notification.requestPermission().then((permission) => {
          if (permission === 'granted') {
            // console.log("Now : "+ new Date().getTime());
            // console.log("Future time : "+ date.getTime());
            // console.log("Difference : "+ (date.getTime()-new Date().getTime()));
            new Notification(
              'Vous avez défini une notification pour votre tâche',
              {
                body: `Nous allons vous notifier quand ce temps (${this.getDayName(date.getDay())} ${date.getDate().toString().padStart(2, '0')}/${(date.getMonth() + 1).toString().padStart(2, '0')}/${date.getFullYear()} ${date.getHours().toString().padStart(2, '0')}:${date.getMinutes().toString().padStart(2, '0')}) arriveras ! `,
                icon: 'favicon.ico',

                requireInteraction: true,
                tag: `${task.id}`,
              },
            );
            this.scheduleNotification(date, task);
          } else {
            alert('Permission refusée');
          }
        });
      }
    } else {
      console.log('Pas de notification définie pour cette tâche !');
    }
  }
}
