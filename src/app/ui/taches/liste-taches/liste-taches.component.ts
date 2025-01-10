import { NgFor, NgIf } from '@angular/common';
import {
  Component,
  EventEmitter,
  inject,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import { Taches } from '../../../models/taches.model';
import { TasksManagerService } from '../../../services/tasks-manager.service';
import { MenuManagerService } from '../../../services/menu-manager.service';

@Component({
  selector: 'app-liste-taches',
  imports: [NgFor, NgIf],
  templateUrl: './liste-taches.component.html',
  styleUrl: './liste-taches.component.scss',
})
export class ListeTachesComponent implements OnInit {
  private TaskManager = inject(TasksManagerService);
  private menuManager = inject(MenuManagerService);
  @Input() listeTaches: any;
  @Input() motif: any;
  @Input() anime: boolean = false;
  @Output() recevoirMotif = new EventEmitter<void>();
  @Output() voirLeFormulaire = new EventEmitter<boolean>();
  @Output() elementAmodifier = new EventEmitter<Taches>();
  @Output() recevoirSaPosition = new EventEmitter<number>();
  @Output() OnVeutModifier = new EventEmitter<boolean>();
  @Output() onSupprime = new EventEmitter<boolean>();

  tacheTerminee = this.TaskManager.tachesTerminees;
  animeterminee = false;

  //propriétés pour le menu contextuel
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
    this.TaskManager.supprimerUnTache(this.id);
    this.motif = !this.motif;
    this.listeTaches = this.TaskManager.taches;
    this.tacheTerminee = this.TaskManager.tachesTerminees;
    this.onSupprime.emit(true);
  }

  modifier() {
    const toutesLesTaches: Taches[] = [
      ...this.listeTaches,
      ...this.tacheTerminee,
    ];
    const elementAmodifier = toutesLesTaches.filter(
      (tache) => tache.id === this.id
    )[0];
    this.TaskManager.ElementAmodifier(this.id);
    // let elementAmodifier = this.TaskManager.elementAmodifier;
    this.voirLeFormulaire.emit(true);
    this.elementAmodifier.emit(elementAmodifier);
    this.OnVeutModifier.emit(true);
    // this.recevoirSaPosition.emit(this.index)
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

  marqueTacheCommeTerminee(index: number) {
    this.animeterminee = true;
    this.TaskManager.marqueTacheCommeTerminée(index);
  }
  inverseAnimeApres1s() {
    this.anime = false;
  }
  marqueTacheCommeNonTerminee(index: number) {
    this.anime = true;
    this.TaskManager.marqueTacheCommeNonTerminée(index);
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
