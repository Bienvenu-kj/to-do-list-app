import { CommonModule, NgIf } from '@angular/common';
import {
  Component,
  computed,
  inject,
  Input,
  OnInit,
  signal,
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Task } from '../../../models/task.model';
import { AuthService } from '../../../services/Auth.service';
import { FormManagerService } from '../../../services/form-manager.service';
import { TasksManagerService } from '../../../services/tasks-manager.service';
import { TasksResearchingService } from '../../../services/tasks-researching.service';
import { TaskFormComponent } from '../../task-form/task-form.component';

@Component({
  selector: 'app-liste-taches',
  imports: [NgIf, CommonModule, TaskFormComponent],
  templateUrl: './liste-taches.component.html',
  styleUrl: './liste-taches.component.scss',
})
export class ListeTachesComponent implements OnInit {
  private TaskManager = inject(TasksManagerService);
  authServ = inject(AuthService);
  resarchServ = inject(TasksResearchingService);
  activedRoute = inject(ActivatedRoute);
  private formManager = inject(FormManagerService);

  @Input() motif: any;

  valeurDeRecherche = this.resarchServ.champValeur;

  anime = signal(false);
  viewForm = this.formManager.viewForm;
  tachesTerminees = this.TaskManager.tachesTerminees;
  tachesBrutes = this.TaskManager.taches;

  tachesRecherchees = this.resarchServ.tachesFiltres;
  tachesRechercheeTerminees = computed(() =>
    this.tachesRecherchees().filter(
      (tache) => tache.etat?.toLocaleLowerCase() === 'terminée',
    ),
  );
  tachesRechercheeNonTerminees = computed(() =>
    this.tachesRecherchees().filter(
      (tache) => tache.etat?.toLocaleLowerCase() === 'non terminée',
    ),
  );

  animeterminee = false;
  researching = signal(false);
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
  constructor() {
    if (this.activedRoute.component?.name === '_ResearchComponent') {
      this.researching.set(true);
    } else {
      this.researching.set(false);
    }
    // effect(()=>{
    //   if(this.valeurDeRecherche()){
    //     this.researching.set(true);
    //     let tacheRechercheeFiltrees = [...this.tachesTerminees(), ...this.tachesBrutes()];
    //       tacheRechercheeFiltrees = tacheRechercheeFiltrees.filter((tache) =>
    //         tache.taskName
    //           .toLocaleLowerCase()
    //           .includes(this.valeurDeRecherche().toLocaleLowerCase())
    //       );
    //       this.tachesRecherchees.set(tacheRechercheeFiltrees);
    //   }else{
    //     this.researching.set(false);
    //   }
    // })
  }

  ngOnInit(): void {
    this.TaskManager.actualiseTaches();
    this.TaskManager.actualiseTachesTerminees();

    document.addEventListener('click', (e) => {
      const element = e.target as HTMLElement;
      if (!element.closest('#contextMenu')) {
        this.motif = false;
      }
    });
  }

  supprimerTache() {
    this.TaskManager.supprimerUnTache(this.id);
    this.motif = !this.motif;
    this.resarchServ.actualiseLesTaches(this.valeurDeRecherche());
  }

  modifier() {
    const toutesLesTaches: Task[] = [
      ...this.tachesBrutes(),
      ...this.tachesTerminees(),
    ];
    const elementAmodifier = toutesLesTaches.filter(
      (tache) => tache.id === this.id,
    )[0];
    this.TaskManager.ElementAmodifier(this.id);
    this.formManager.onViewingForm();
    this.formManager.onModifyingTask();

    this.resarchServ.actualiseLesTaches(this.valeurDeRecherche());
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
  }

  marqueTacheCommeTerminee(id: number | undefined) {
    this.animeterminee = true;
    this.TaskManager.marqueTacheCommeTerminée(id);
    this.resarchServ.actualiseLesTaches(this.valeurDeRecherche());
  }

  inverseAnimeApres1s() {
    this.anime.set(false);
  }

  marqueTacheCommeNonTerminee(id: number | undefined) {
    this.anime.set(true);
    this.TaskManager.marqueTacheCommeNonTerminée(id);
    this.resarchServ.actualiseLesTaches(this.valeurDeRecherche());
  }

  onAjouteUntache(e: boolean) {
    this.anime.set(e);
  }
}
