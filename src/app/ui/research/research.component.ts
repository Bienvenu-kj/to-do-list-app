import { Component, inject, OnInit } from '@angular/core';

import { AuthService } from '../../services/Auth.service';
import { TasksManagerService } from '../../services/tasks-manager.service';
import { TaskSearchService } from '../../services/task-search.service';
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
  private taskSearchService = inject(TaskSearchService);
  isSearching = this.taskSearchService.isSearching;
  matchingTaskCount = this.taskSearchService.matchingTaskCount;
  searchInput!: HTMLInputElement;

  searchTasks(event: Event): void {
    this.searchInput = event.target as HTMLInputElement;
    this.taskSearchService.searchTasks(this.searchInput.value);
  }

  onVeutPlusChercher() {
    this.authServ.ilNeVeutPlusRechercher();
  }

  ngOnInit(): void {
    this.taskManager.refreshTasks();
    this.taskManager.refreshCompletedTasks();
    document.getElementById('researchInput')?.focus();
    this.taskSearchService.resetSearch();
  }
}
