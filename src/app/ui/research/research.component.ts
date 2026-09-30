import { Component, computed, inject, OnInit } from '@angular/core';

import { AuthService } from '../../services/Auth.service';
import { TasksManagerService } from '../../services/tasks-manager.service';
import { TasksResearchingService } from '../../services/tasks-researching.service';
import { ListeTachesComponent } from '../taches/liste-taches/liste-taches.component';

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
  tachesFiltres = computed(() => this.researchServ.tachesFiltres());
  champsRecherche!: HTMLInputElement;

  RecherTaches(event: Event) {
    this.champsRecherche = event.target as HTMLInputElement;
    let champs = event.target as HTMLInputElement;
    let champs_valeur = champs.value;
    this.researchServ.rechercheTache(champs_valeur);
  }

  onVeutPlusChercher() {
    this.authServ.ilNeVeutPlusRechercher();
  }

  ngOnInit(): void {
    this.taskManager.refreshTasks();
    this.taskManager.refreshCompletedTasks();
    document.getElementById('researchInput')?.focus();
    this.researchServ.tachesCourantesRercherchees();
    this.researchServ.reunialiseRerchercheesRecenctes();
  }
}
