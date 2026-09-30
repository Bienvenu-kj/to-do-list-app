import { Injectable, OnInit, signal, WritableSignal } from '@angular/core';
import { Taches } from '../models/taches.model';
import { NgModel } from '@angular/forms';

@Injectable({
  providedIn: 'root',
})
export class TasksManagerService {
  constructor() {}

  taches = signal<Taches[]>(
    JSON.parse(localStorage.getItem('unfinishedTasks') as string) || [],
  );
  taches_filtrés = this.taches;
  elementAmodifier = signal<Taches>({
    taskName: '',
    etat: '',
  });
  tacheAsupprimer = signal<Taches>({
    taskName: '',
  });
  indexDelementAmodifier = signal(0);
  tachesTerminees = signal<Taches[]>(
    JSON.parse(localStorage.getItem('finishedTasks') as string) || [],
  );
  toutesLesTaches = [...this.taches(), ...this.tachesTerminees()];
  id = signal(Number(localStorage.getItem('id')) || 0);

  marqueTacheCommeTerminée(id: number | undefined) {
    const tachesNonTerminées: Taches[] =
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
    const tachesTerminées: Taches[] =
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
    let element: Taches;
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

  modiferTache(tache: Taches) {
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

  ajoutTAches(tache: Taches) {
    let taches: Taches[] =
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
