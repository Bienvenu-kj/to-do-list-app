import { computed, inject, Injectable, signal } from '@angular/core';

import { Task } from '../models/task.model';
import { TasksManagerService } from './tasks-manager.service';

@Injectable({
  providedIn: 'root',
})
export class TaskSearchService {
  private taskManager = inject(TasksManagerService);

  searchQuery = signal('');
  filteredTasks = signal<Task[]>([]);
  isSearching = signal(false);
  matchingTaskCount = signal(0);
  incompleteTasks = computed(() => this.taskManager.tasks());
  completedTasks = computed(() => this.taskManager.completedTasks());
  allTasks = computed(() => [
    ...this.incompleteTasks(),
    ...this.completedTasks(),
  ]);

  resetSearch(): void {
    this.filteredTasks.set([]);
    this.isSearching.set(false);
    this.matchingTaskCount.set(0);
    this.searchQuery.set('');
  }

  refreshSearchResults(query: string): void {
    this.searchTasks(query || this.searchQuery());
  }

  searchTasks(query: string): void {
    this.searchQuery.set(query);

    const matchingTasks = this.allTasks().filter((task) =>
      task.taskName.toLocaleLowerCase().includes(query.toLocaleLowerCase()),
    );

    this.filteredTasks.set(matchingTasks);
    this.isSearching.set(query.length > 0);
    this.matchingTaskCount.set(matchingTasks.length);
  }
}
