import { Injectable } from '@angular/core';
import { Taches } from '../models/taches.model';
import { NgModel } from '@angular/forms';

@Injectable({
  providedIn: 'root',
})
export class TasksManagerService {
  constructor() {}

  taches: Taches[] = [];
  taches_filtrés = this.taches;
  elementAmodifier!: any;
  indexDelementAmodifier!: number;
  tachesTerminees: Taches[] = [];

  marqueTacheCommeTerminée(index: number) {
    const tacheTerminee = this.taches.splice(index, 1);

    this.tachesTerminees.unshift({
      taskName: `${tacheTerminee[0].taskName}`,
      etat: 'terminée',
    });
  }

  supprimerUnTache(index: number) {
    let newListTache = this.taches.splice(index, 1);
    console.log(newListTache);
  }
  supprimerUnTacheTerminee(index: number) {
    let newListTache = this.tachesTerminees.splice(index, 1);
    console.log(newListTache);
  }

  ElementAmodifier(index: number) {
    this.elementAmodifier = this.taches[index];
    this.indexDelementAmodifier = index;
  }
  inverseLindex(index: number) {
    this.indexDelementAmodifier = index;
  }

  modiferTache(tache: Taches) {
    this.taches[this.indexDelementAmodifier].taskName = tache.taskName;
    this.taches[this.indexDelementAmodifier].etat = 'Modifiée';
  }

  ajoutTAches(nom: string, etat?: string) {
    this.taches.unshift({
      taskName: `${nom}`,
      etat: `${etat}`,
    });
  }
}
