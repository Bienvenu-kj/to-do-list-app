import { Component, inject, OnInit } from '@angular/core';

import { AuthService } from '../../services/auth.service';
import { TasksManagerService } from '../../services/tasks-manager.service';
import { TaskSearchService } from '../../services/task-search.service';
import { TaskListComponent } from '../taches/liste-taches/liste-taches.component';

@Component({
  selector: 'app-research',
  imports: [TaskListComponent],
  templateUrl: './research.component.html',
  styleUrl: './research.component.scss',
})
export default class ResearchComponent implements OnInit {
  private taskManager = inject(TasksManagerService);
  private authService = inject(AuthService);
  private taskSearchService = inject(TaskSearchService);
  isSearching = this.taskSearchService.isSearching;
  matchingTaskCount = this.taskSearchService.matchingTaskCount;

  searchTasks(event: Event): void {
    const searchInput = event.target as HTMLInputElement;
    this.taskSearchService.searchTasks(searchInput.value);
  }

  closeSearch(): void {
    this.authService.stopSearch();
  }

  ngOnInit(): void {
    this.taskManager.refreshTasks();
    this.taskManager.refreshCompletedTasks();
    document.getElementById('researchInput')?.focus();
    this.taskSearchService.resetSearch();
  }
}
