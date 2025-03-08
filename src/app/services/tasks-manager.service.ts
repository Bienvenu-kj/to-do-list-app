import { Injectable, signal } from '@angular/core';
import { Taches } from '../models/taches.model';
import { NgModel } from '@angular/forms';

@Injectable({
  providedIn: 'root',
})
export class TasksManagerService {
  constructor() {}

  taches = signal<Taches[]>([]);
  taches_filtrés = signal<Taches[]>(this.taches());
  elementAmodifier = signal<Taches>({
    taskName: '',
    etat: '',
  });
  tacheAsupprimer = signal<Taches>({
    taskName: '',
  });
  indexDelementAmodifier = signal(0);
  tachesTerminees = signal<Taches[]>([]);
  toutesLesTaches = [...this.taches(), ...this.tachesTerminees()];
  id = 0;

  marqueTacheCommeTerminée(index: number) {
    const tacheTerminee = this.taches().splice(index, 1);

    this.tachesTerminees().unshift({
      taskName: `${tacheTerminee[0].taskName}`,
      etat: 'terminée',
      id: tacheTerminee[0].id,
    });
    console.log('id pour taches terminées');
    this.tachesTerminees().forEach((tache) => console.log(tache.id));
  }
  marqueTacheCommeNonTerminée(index: number) {
    const tacheTerminee = this.tachesTerminees().splice(index, 1);
    this.taches().unshift({
      taskName: `${tacheTerminee[0].taskName}`,
      etat: 'non terminée',
      id: tacheTerminee[0].id,
    });
  }

  // supprimerUnTache(index: number) {
  //   let newListTache = this.taches.splice(index, 1);
  //   console.log(newListTache);
  // }
  supprimerUnTache(id: number) {
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
    } else if (
      this.tacheAsupprimer().etat?.toLocaleLowerCase() === 'terminée'
    ) {
      index = this.tachesTerminees().indexOf(this.tacheAsupprimer());
      this.tachesTerminees().splice(index, 1);
    }
  }

  ElementAmodifier(id: number) {
    let toutesLesTaches = [...this.taches(), ...this.tachesTerminees()];
    this.elementAmodifier.set(
      toutesLesTaches.filter((tache) => tache.id === id)[0]
    );
  }

  inverseLindex(index: number) {
    this.indexDelementAmodifier.set(index);
  }

  modiferTache(tache: Taches) {
    let index;
    if (this.elementAmodifier().etat?.toLocaleLowerCase() === 'non terminée') {
      index = this.taches().indexOf(this.elementAmodifier());
      this.taches()[index].taskName = tache.taskName;
    } else if (
      this.elementAmodifier().etat?.toLocaleLowerCase() === 'terminée'
    ) {
      index = this.tachesTerminees().indexOf(this.elementAmodifier());
      this.tachesTerminees()[index].taskName = tache.taskName;
    }
  }

  ajoutTAches(nom: string, etat?: string) {
    this.id = this.id + 1;
    this.taches().unshift({
      taskName: `${nom}`,
      etat: `${etat}`,
      id: this.id,
    });
    console.log('id pour taches non terminées');
    this.taches().forEach((tache) => console.log(tache.id));
  }
}
