import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnInit,
} from '@angular/core';

import { AuthService } from '../../../../services/auth.service';
import { TaskStoreService } from '../../services/task-store.service';
import { TaskSearchService } from '../../services/task-search.service';
import { TaskList } from '../../components/task-list/task-list';

@Component({
  selector: 'app-task-search',
  imports: [TaskList],
  templateUrl: './task-search.html',
  changeDetection: ChangeDetectionStrategy.Eager,
  styleUrl: './task-search.scss',
})
export default class TaskSearch implements OnInit {
  private taskStore = inject(TaskStoreService);
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
    this.taskStore.refreshTasks();
    this.taskStore.refreshCompletedTasks();
    document.getElementById('searchInput')?.focus();
    this.taskSearchService.resetSearch();
  }
}
