import { NgFor, NgIf } from '@angular/common';
import {
  Component,
  EventEmitter,
  inject,
  input,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import { Taches } from '../../../models/taches.model';
import { TasksManagerService } from '../../../services/tasks-manager.service';

@Component({
  selector: 'app-liste-taches',
  imports: [NgFor, NgIf],
  templateUrl: './liste-taches.component.html',
  styleUrl: './liste-taches.component.scss',
})
export class ListeTachesComponent implements OnInit {
  @Input() listeTaches: any;
  @Input() motif: any;
  @Output() recevoirMotif = new EventEmitter<void>();
  @Output() voirLeFormulaire = new EventEmitter<boolean>();
  @Output() elementAmodifier = new EventEmitter<Taches>();
  @Output() recevoirSaPosition = new EventEmitter<number>();
  @Output() OnVeutModifier = new EventEmitter<boolean>();
  @Output() onSupprime = new EventEmitter<boolean>();
  private TaskManager = inject(TasksManagerService);
  tacheTerminee = this.TaskManager.tachesTerminees;
  @Input() anime!: boolean;

  animeterminee = false;
  supp: any;
  mod: any;

  posiX: any;
  posiY: any;

  classD: string = 'hidden';
  index!: number;

  element: any;
  elementPosition = {
    top: ``,
    left: ``,
    position: 'absolute',
  };
  cacherMenuContext() {
    this.motif = false;
  }
  supprimerTache() {
    this.TaskManager.supprimerUnTache(this.index);
    this.motif = !this.motif;
    this.listeTaches = this.TaskManager.taches;
    this.onSupprime.emit(true);
  }
  // supprimeTacheTerminee() {
  //   this.TaskManager.supprimerUnTacheTerminee(this.index);
  //   this.motif = !this.motif;
  //   this.tacheTerminee = this.TaskManager.tachesTerminees;
  //   this.onSupprime.emit(true);
  // }
  modifier() {
    const elementAmodifier: Taches = this.listeTaches[this.index];
    this.voirLeFormulaire.emit(true);
    this.TaskManager.ElementAmodifier(this.index);
    console.log(this.TaskManager.indexDelementAmodifier);
    this.elementAmodifier.emit(elementAmodifier);
    this.OnVeutModifier.emit(true);
    // this.recevoirSaPosition.emit(this.index)
  }
  onlongpressed: any;

  OnTouchStart(event: TouchEvent, i: number) {
    this.onlongpressed = setTimeout(() => {
      this.supp = 'Supprimer la tache';
      this.mod = 'Modifier la tache';
      event.preventDefault();
      this.motif = true;
      this.elementPosition.top = `${event.touches[0].clientX / 1.6}px`;
      this.elementPosition.left = ` ${event.touches[0].clientY / 2.5}px`;
      this.element = event.target;
      this.classD = 'view';
      this.index = i;
      console.log(this.elementPosition.top, this.elementPosition.left);
    }, 600);
  }
  OnTouchEnd() {
    clearTimeout(this.onlongpressed);
  }

  onRightClick(event: MouseEvent, i: number): void {
    this.supp = 'Supprimer la tâche';
    this.mod = 'Modifier la tâche';
    event.preventDefault();
    this.motif = true;
    this.elementPosition.top = `${event.clientY / 1.6}px`;
    this.elementPosition.left = ` ${event.clientX / 2.5}px`;
    this.element = event.target;
    this.classD = 'view';
    this.index = i;
    console.log(this.elementPosition.top, this.elementPosition.left);
  }

  marqueTacheCommeTerminee(index: number) {
    this.animeterminee = true;
    this.TaskManager.marqueTacheCommeTerminée(index);
  }
  ngOnInit(): void {
    document.addEventListener('click', (e) => {
      const element = e.target as HTMLElement;
      if (!element.closest('#contextMenu')) {
        this.motif = false;
      }
    });
  }
}
