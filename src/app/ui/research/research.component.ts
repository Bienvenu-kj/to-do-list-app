import {
  Component,
  computed,
  EventEmitter,
  inject,
  OnInit,
  Output,
  ViewEncapsulation,
} from '@angular/core';
import { TasksManagerService } from '../../services/tasks-manager.service';
import { Taches } from '../../models/taches.model';

import { TaskFormComponent } from '../task-form/task-form.component';
import { NgIf } from '@angular/common';
import {AuthService} from '../../services/Auth.service'
import { TasksResearchingService } from '../../services/tasks-researching.service';
import { ListeTachesComponent } from "../taches/liste-taches/liste-taches.component";
@Component({
  selector: 'app-research',
  imports: [ListeTachesComponent],
  templateUrl: './research.component.html',
  styleUrl: './research.component.scss',
})
export default class ResearchComponent implements OnInit {
  taskManager = inject(TasksManagerService);
  private authServ = inject(AuthService);
  private researchServ = inject(TasksResearchingService);
  onVeutRecherhcher = this.researchServ.onVeutRecherhcher;
  TacheTrouvee = this.researchServ.TacheTrouvee;
  tachesFiltres = computed(()=>this.researchServ.tachesFiltres()) ;
  champsRecherche!: HTMLInputElement;


  RecherTaches(event: Event) {
    this.champsRecherche = event.target as HTMLInputElement;
    let champs = event.target as HTMLInputElement;
    let champs_valeur = champs.value;
    this.researchServ.rechercheTache(champs_valeur);
  }

  onVeutPlusChercher(){
    this.authServ.ilNeVeutPlusRechercher()
  }

  ngOnInit(): void {
    this.taskManager.actualiseTaches();
    this.taskManager.actualiseTachesTerminees();
    document.getElementById('researchInput')?.focus();
    this.researchServ.tachesCourantesRercherchees();
    this.researchServ.reunialiseRerchercheesRecenctes();
  }
}

