import { Injectable, signal } from '@angular/core';

import { Task } from '../models/task.model';

@Injectable({
  providedIn: 'root',
})
export class TasksManagerService {
  constructor() {}

  taches = signal<Task[]>(
    JSON.parse(localStorage.getItem('unfinishedTasks') as string) || [],
  );
  taches_filtrés = this.taches;
  elementAmodifier = signal<Task>({
    taskName: '',
    etat: '',
  });
  tacheAsupprimer = signal<Task>({
    taskName: '',
  });
  indexDelementAmodifier = signal(0);
  tachesTerminees = signal<Task[]>(
    JSON.parse(localStorage.getItem('finishedTasks') as string) || [],
  );
  toutesLesTaches = [...this.taches(), ...this.tachesTerminees()];
  id = signal(Number(localStorage.getItem('id')) || 0);

  marqueTacheCommeTerminée(id: number | undefined) {
    const tachesNonTerminées: Task[] =
      JSON.parse(localStorage.getItem('unfinishedTasks') as string) || [];
    let tacheIndex = 0;
    const tacheTerminee = tachesNonTerminées.find((tache, index) => {
      tacheIndex = index;
      return tache.id === id;
    });

    tachesNonTerminées.splice(tacheIndex, 1);
    localStorage.setItem('unfinishedTasks', JSON.stringify(tachesNonTerminées));
    this.actualiseTaches();

    let tachesTerminees =
      JSON.parse(localStorage.getItem('finishedTasks') as string) || [];
    tachesTerminees.unshift({
      taskName: `${tacheTerminee?.taskName}`,
      etat: 'terminée',
      id: tacheTerminee?.id,
      notification: tacheTerminee?.notification,
    });
    localStorage.setItem('finishedTasks', JSON.stringify(tachesTerminees));
    this.actualiseTachesTerminees();
  }

  marqueTacheCommeNonTerminée(id: number | undefined) {
    const tachesTerminées: Task[] =
      JSON.parse(localStorage.getItem('finishedTasks') as string) || [];
    let tacheIndex = 0;
    const tacheNonTerminee = tachesTerminées.find((tache, index) => {
      tacheIndex = index;
      return tache.id === id;
    });

    tachesTerminées.splice(tacheIndex, 1);
    localStorage.setItem('finishedTasks', JSON.stringify(tachesTerminées));
    this.actualiseTachesTerminees();

    let tachesNonTerminees =
      JSON.parse(localStorage.getItem('unfinishedTasks') as string) || [];
    tachesNonTerminees.unshift({
      taskName: `${tacheNonTerminee?.taskName}`,
      etat: 'Non terminée',
      id: tacheNonTerminee?.id,
      notification: tacheNonTerminee?.notification,
    });
    localStorage.setItem('unfinishedTasks', JSON.stringify(tachesNonTerminees));
    this.actualiseTaches();
  }

  supprimerUnTache(id: number) {
    this.actualiseTaches();
    this.actualiseTachesTerminees();
    let element: Task;
    let index: number;
    let toutesLesTaches = [...this.taches(), ...this.tachesTerminees()];
    for (let index = 0; index < toutesLesTaches.length; index++) {
      element = toutesLesTaches[index];
      if (element.id === id) {
        this.tacheAsupprimer.set(element);
        break;
      }
    }
    if (this.tacheAsupprimer().etat?.toLocaleLowerCase() === 'non terminée') {
      index = this.taches().indexOf(this.tacheAsupprimer());
      this.taches().splice(index, 1);
      localStorage.setItem('unfinishedTasks', JSON.stringify(this.taches()));
      this.actualiseTaches();
    } else if (
      this.tacheAsupprimer().etat?.toLocaleLowerCase() === 'terminée'
    ) {
      index = this.tachesTerminees().indexOf(this.tacheAsupprimer());
      this.tachesTerminees().splice(index, 1);
      localStorage.setItem(
        'finishedTasks',
        JSON.stringify(this.tachesTerminees()),
      );
      this.actualiseTachesTerminees();
    }
  }

  ElementAmodifier(id: number) {
    let toutesLesTaches = [...this.taches(), ...this.tachesTerminees()];
    this.elementAmodifier.set(
      toutesLesTaches.filter((tache) => tache.id === id)[0],
    );
  }

  inverseLindex(index: number) {
    this.indexDelementAmodifier.set(index);
  }

  modiferTache(tache: Task) {
    let index;
    if (tache.notification) {
      this.elementAmodifier().notification = tache.notification;
    }
    if (this.elementAmodifier().etat?.toLocaleLowerCase() === 'non terminée') {
      index = this.taches().indexOf(this.elementAmodifier());
      this.taches()[index].taskName = tache.taskName;
      localStorage.setItem('unfinishedTasks', JSON.stringify(this.taches()));
      this.actualiseTaches();
    } else if (
      this.elementAmodifier().etat?.toLocaleLowerCase() === 'terminée'
    ) {
      index = this.tachesTerminees().indexOf(this.elementAmodifier());
      this.tachesTerminees()[index].taskName = tache.taskName;
      localStorage.setItem(
        'finishedTasks',
        JSON.stringify(this.tachesTerminees()),
      );
      this.actualiseTachesTerminees();
    }
  }

  ajoutTAches(tache: Task) {
    let taches: Task[] =
      JSON.parse(localStorage.getItem('unfinishedTasks') as string) || [];
    const id = taches.length + 1;
    localStorage.setItem('id', `${id}`);
    taches.unshift({
      taskName: tache.taskName,
      etat: `Non terminée`,
      id: id,
      notification: tache.notification,
    });
    localStorage.setItem('unfinishedTasks', JSON.stringify(taches));
    this.actualiseTaches();
  }
  actualiseTaches() {
    this.taches.set(
      JSON.parse(localStorage.getItem('unfinishedTasks') as string) || [],
    );
  }
  actualiseTachesTerminees() {
    this.tachesTerminees.set(
      JSON.parse(localStorage.getItem('finishedTasks') as string) || [],
    );
  }
}
