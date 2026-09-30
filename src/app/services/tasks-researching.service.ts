import { computed, inject, Injectable, signal } from '@angular/core';

import { Task } from '../models/task.model';
import { TasksManagerService } from './tasks-manager.service';

@Injectable({
  providedIn: 'root',
})
export class TasksResearchingService {
  private taskManager = inject(TasksManagerService);

  champValeur = signal<string>('');
  tachesFiltres = signal<Task[]>([]);
  onVeutRecherhcher = signal<boolean>(false);
  TacheTrouvee = signal<number>(0);
  tachesNonTerminees = computed(() => this.taskManager.tasks());
  tacheTerminees = computed(() => this.taskManager.completedTasks());
  ToutesLesTaches = computed(() => [
    ...this.tachesNonTerminees(),
    ...this.tacheTerminees(),
  ]);
  constructor() {}
  reunialiseRerchercheesRecenctes(): void {
    this.tachesFiltres.set([]);
    this.onVeutRecherhcher.set(false);
    this.TacheTrouvee.set(0);
    this.champValeur.set('');
  }
  actualiseLesTaches(valeurDeRecherche: string) {
    this.rechercheTache(
      valeurDeRecherche ? valeurDeRecherche : this.champValeur(),
    );
  }

  tachesCourantesRercherchees() {}

  rechercheTache(valeurDeRecherche: string): void {
    let champs_valeur = valeurDeRecherche;
    this.champValeur.set(champs_valeur);
    this.tachesFiltres.set([...this.ToutesLesTaches()]);
    const tachesFiltres = this.tachesFiltres().filter((tache) =>
      tache.taskName
        .toLocaleLowerCase()
        .includes(champs_valeur.toLocaleLowerCase()),
    );
    this.tachesFiltres.set(tachesFiltres);

    if (champs_valeur.length) {
      this.onVeutRecherhcher.set(true);
      this.TacheTrouvee.set(tachesFiltres.length);
    } else {
      this.onVeutRecherhcher.set(false);
    }
  }
}
