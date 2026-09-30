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
import { TaskSearchService } from '../../../services/task-search.service';
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
  private taskSearchService = inject(TaskSearchService);
  activedRoute = inject(ActivatedRoute);
  private formManager = inject(FormManagerService);

  @Input() motif: any;

  searchQuery = this.taskSearchService.searchQuery;

  anime = signal(false);
  viewForm = this.formManager.viewForm;
  tachesTerminees = this.TaskManager.completedTasks;
  tachesBrutes = this.TaskManager.tasks;

  filteredTasks = this.taskSearchService.filteredTasks;
  filteredCompletedTasks = computed(() =>
    this.filteredTasks().filter(
      (tache) => tache.etat?.toLocaleLowerCase() === 'terminée',
    ),
  );
  filteredIncompleteTasks = computed(() =>
    this.filteredTasks().filter(
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
  }

  ngOnInit(): void {
    this.TaskManager.refreshTasks();
    this.TaskManager.refreshCompletedTasks();

    document.addEventListener('click', (e) => {
      const element = e.target as HTMLElement;
      if (!element.closest('#contextMenu')) {
        this.motif = false;
      }
    });
  }

  supprimerTache() {
    this.TaskManager.deleteTask(this.id);
    this.motif = !this.motif;
    this.taskSearchService.refreshSearchResults(this.searchQuery());
  }

  modifier() {
    const toutesLesTaches: Task[] = [
      ...this.tachesBrutes(),
      ...this.tachesTerminees(),
    ];
    const elementAmodifier = toutesLesTaches.filter(
      (tache) => tache.id === this.id,
    )[0];
    this.TaskManager.selectTaskToEdit(this.id);
    this.formManager.onViewingForm();
    this.formManager.onModifyingTask();

    this.taskSearchService.refreshSearchResults(this.searchQuery());
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
    this.TaskManager.markTaskAsCompleted(id);
    this.taskSearchService.refreshSearchResults(this.searchQuery());
  }

  inverseAnimeApres1s() {
    this.anime.set(false);
  }

  marqueTacheCommeNonTerminee(id: number | undefined) {
    this.anime.set(true);
    this.TaskManager.markTaskAsIncomplete(id);
    this.taskSearchService.refreshSearchResults(this.searchQuery());
  }

  onAjouteUntache(e: boolean) {
    this.anime.set(e);
  }
}
