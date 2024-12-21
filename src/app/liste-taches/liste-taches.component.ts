import { NgFor, NgIf } from '@angular/common';
import { Component, EventEmitter, Input, Output} from '@angular/core';

@Component({
  selector: 'app-liste-taches',
  imports: [NgFor, NgIf],
  templateUrl: './liste-taches.component.html',
  styleUrl: './liste-taches.component.scss'
})
export class ListeTachesComponent {

  @Input() listeTaches:any;
  @Input() motif:any;
  @Output() recevoirMotif = new EventEmitter<void>();

  supp: any;
  mod: any;
  
  posiX: any;
  posiY:any;
  
  classD:string = 'hidden'
  index!:number;
  

  element:any;
  elementPosition={
    'top': `` ,
     'left': `` ,
     'position': 'absolute'
  }
  cacherMenuContext() {
    this.motif = false;
  }
  supprimerTache(){
    let newListTache = this.listeTaches.splice(this.index,1);
    this.motif = !this.motif;
    console.log(newListTache)
  }
  modifier(){
    
  }

  
  
  contextMenu(event:MouseEvent, i:number):void{
    this.supp = 'Supprimer';
    this.mod = "Modifier";
    event.preventDefault();
    this.motif = true
    this.elementPosition.top = `${event.clientY/1.6}px` ;
    this.elementPosition.left =` ${event.clientX/1.6}px`;
    this.element = event.target;
    this.classD = 'view';
    this.index = i
    console.log(this.elementPosition.top, this.elementPosition.left)
  }
  
}
