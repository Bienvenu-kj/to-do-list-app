import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnInit,
} from '@angular/core';

import { AuthService } from '../../services/auth.service';
import { TasksManagerService } from '../../services/tasks-manager.service';
import { TaskSearchService } from '../../services/task-search.service';
import { TaskListComponent } from '../tasks/task-list/task-list.component';

@Component({
  selector: 'app-task-search',
  imports: [TaskListComponent],
  templateUrl: './task-search.component.html',
  changeDetection: ChangeDetectionStrategy.Eager,
  styleUrl: './task-search.component.scss',
})
export default class TaskSearchComponent implements OnInit {
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
    document.getElementById('searchInput')?.focus();
    this.taskSearchService.resetSearch();
  }
}
