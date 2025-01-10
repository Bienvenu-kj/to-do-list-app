import {
  Component,
  EventEmitter,
  inject,
  OnInit,
  Output,
  ViewEncapsulation,
} from '@angular/core';
import { TasksManagerService } from '../../services/tasks-manager.service';
import { Taches } from '../../models/taches.model';
import { RouterLink } from '@angular/router';
import { TaskFormComponent } from '../task-form/task-form.component';
import { NgIf } from '@angular/common';
@Component({
  selector: 'app-research',
  imports: [RouterLink, TaskFormComponent, NgIf],
  templateUrl: './research.component.html',
  styleUrl: './research.component.scss',
})
export default class ResearchComponent implements OnInit {
  @Output() onVeutOuVeutPlusRechercher = new EventEmitter<boolean>();
  taskManager = inject(TasksManagerService);
  onVeutRecherhcher = false;
  TacheTrouvee!: number;
  tacheTerminee = this.taskManager.tachesTerminees;
  tachesBrutes = this.taskManager.taches; // taches brutes
  tache: Taches[] = [];
  tachesFiltres = [...this.tachesBrutes, ...this.tacheTerminee]; // les taches filtrées
  champsRecherche!: HTMLInputElement;
  OnVeutModifier!: boolean;
  voirLeFormulaire!: boolean;
  elementAmodifier!: Taches;
  champValeur!: string;
  OnVeutRechercher() {
    // this.onVeutRecherhcher = true;
    // this.onVeutOuVeutPlusRechercher.emit(true);
  }
  OnVeutPlusRechercher() {
    this.onVeutRecherhcher = false;
    this.onVeutOuVeutPlusRechercher.emit(false);
  }

  RecherTaches(event: Event) {
    this.champsRecherche = event.target as HTMLInputElement;
    let champs = event.target as HTMLInputElement;
    let champs_valeur = champs.value;
    this.champValeur = champs_valeur;
    // this.champsValeur = champs_valeur;
    this.tachesFiltres = [...this.tachesBrutes, ...this.tacheTerminee];
    this.tachesFiltres = this.tachesFiltres.filter((tache) =>
      tache.taskName.includes(champs_valeur)
    );

    if (champs_valeur.length) {
      this.onVeutRecherhcher = true;
      this.TacheTrouvee = this.tachesFiltres.length;
    } else {
      this.onVeutRecherhcher = false;
    }
  }

  // pour le menu contextuel et ses éléments
  //propriétés pour le menu contextuel
  motif = false;
  classD = 'hidden';
  index!: number; // pour l'index de l'element séléctionné
  id!: number;
  posiX: any;
  posiY: any;
  element: any;
  elementPosition = {
    top: ``,
    left: ``,
    position: 'absolute',
  };

  supprimerTache() {
    this.taskManager.supprimerUnTache(this.id);
    this.motif = !this.motif;
    this.tachesFiltres = [...this.tachesBrutes, ...this.tacheTerminee];
    this.tachesFiltres = this.tachesFiltres.filter((tache) =>
      tache.taskName.includes(this.champValeur)
    );
    this.TacheTrouvee = this.tachesFiltres.length;
    // this.onSupprime.emit(true);
  }

  modifier() {
    const toutesLesTaches: Taches[] = this.tachesFiltres;
    const elementAmodifier = toutesLesTaches.filter(
      (tache) => tache.id === this.id
    )[0];
    this.taskManager.ElementAmodifier(this.id);
    // let elementAmodifier = this.TaskManager.elementAmodifier;
    this.voirLeFormulaire = true;
    this.elementAmodifier = elementAmodifier;
    this.OnVeutModifier = true;
    // this.recevoirSaPosition.emit(this.index)
    this.tachesFiltres = this.tachesFiltres;
  }
  onlongpressed: any;

  OnTouchStart(event: TouchEvent, i: number, id?: number) {
    this.onlongpressed = setTimeout(() => {
      event.preventDefault();
      this.motif = true;
      this.elementPosition.top = `${event.touches[0].clientX / 1.6}px`;
      this.elementPosition.left = ` ${event.touches[0].clientY / 2.5}px`;
      this.element = event.target;
      this.classD = 'view';
      this.index = i;
      this.id = id as number;
      console.log(this.elementPosition.top, this.elementPosition.left);
    }, 600);
  }
  OnTouchEnd() {
    clearTimeout(this.onlongpressed);
  }

  onRightClick(event: MouseEvent, index: number, id?: number): void {
    event.preventDefault();
    this.motif = true;
    this.elementPosition.top = `${event.clientY / 1.6}px`;
    this.elementPosition.left = ` ${event.clientX / 2.5}px`;
    this.element = event.target;
    this.classD = 'view';
    this.index = index;
    this.id = id as number;
    console.log(this.elementPosition.top, this.elementPosition.left);
  }
  recevoirlafermeture(e: boolean) {
    this.voirLeFormulaire = e; // la propriété cache reçoit la valeur probablement  'false' (emise par l'enfant task-form.component (recevoirLafermeture) lors de la soumission du
    // formulaire pour faire disparaître le formulaire)
    this.tachesFiltres = [...this.tachesBrutes, ...this.tacheTerminee];
    this.tachesFiltres = this.tachesFiltres.filter((tache) =>
      tache.taskName.includes(this.champValeur)
    );
    this.TacheTrouvee = this.tachesFiltres.length;
  }
  recevoirlouverture(e: boolean) {
    this.voirLeFormulaire = e; // la proriété cache reçoit la valeur (emise par l'enfant liste-taches.component (voirLeFormulaire) lors du clic sur la commande 'modidier'
    // pour faire apparaitre le formulaire) probablement true
  }
  //  tacheAmodifier(tache: {}){

  ngOnInit(): void {
    document.getElementById('researchInput')?.focus();
    document.addEventListener('click', (e) => {
      const element = e.target as HTMLElement;
      if (!element.closest('#contextMenu')) {
        this.motif = false;
      }
    });
  }
}

// [class.tache-animation]="anime"
// (touchstart)="OnTouchStart($event, i)"
//        (touchend)="OnTouchEnd()"
// (contextmenu)="onRightClick($event, i)"
//  (click)="marqueTacheCommeTerminee(i)"
