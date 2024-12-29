import { Injectable } from '@angular/core';
import { Taches } from '../models/taches.model';
import { NgModel } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class TasksManagerService {
  constructor() { }

  taches:Taches[] = [
  
  ]
  elementAmodifier!:any;
  indexDelementAmodifier!:number;

  supprimerUnTache(index:number){
    let newListTache = this.taches.splice(index,1);
  }

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
