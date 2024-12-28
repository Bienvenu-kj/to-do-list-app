import { Injectable } from '@angular/core';
import { Taches } from '../models/taches.model';
import { NgModel } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class TasksManagerService {
  constructor() { }

  taches:Taches[] = [
    {
      taskName : 'Faire le sport',
      etat : 'Non commencée',
    },
    {
      taskName: 'Faire le devoir',
      etat : 'Non commencée',
    },
    {
      taskName : 'Suivre un film',
      etat : 'Non commencée'
    }
  ]
  elementAmodifier!:any;
  indexDelementAmodifier!:number;

  ElementAmodifier(index:number){
    this.elementAmodifier = this.taches[index]
    this.indexDelementAmodifier = index
  }
  inverseLindex(index:number){
    this.indexDelementAmodifier = index
  }
  
  modiferTache(tache:Taches){
    this.taches[this.indexDelementAmodifier].taskName = tache.taskName
    this.taches[this.indexDelementAmodifier].etat = 'Modifiée'
  }

  ajoutTAches(nom:string,etat?:string){
    this.taches.unshift({
      taskName:`${nom}`,
      etat:`${etat}`
    })
  }
}
