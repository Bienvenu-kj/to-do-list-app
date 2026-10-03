import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  Input,
  OnInit,
  signal,
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { TaskFormService } from '../../services/task-form.service';
import { TaskStoreService } from '../../services/task-store.service';
import { TaskSearchService } from '../../services/task-search.service';
import { TaskForm } from '../task-form/task-form';

@Component({
  selector: 'app-task-list',
  imports: [CommonModule, TaskForm],
  templateUrl: './task-list.html',
  changeDetection: ChangeDetectionStrategy.Eager,
  styleUrl: './task-list.scss',
})
export class TaskList implements OnInit {
  private taskStore = inject(TaskStoreService);
  private taskSearchService = inject(TaskSearchService);
  private activatedRoute = inject(ActivatedRoute);
  private taskFormService = inject(TaskFormService);

  @Input() isContextMenuOpen = false;

  searchQuery = this.taskSearchService.searchQuery;

  isTaskAnimating = signal(false);
  isFormVisible = this.taskFormService.isFormVisible;
  completedTasks = this.taskStore.completedTasks;
  tasks = this.taskStore.tasks;

  filteredTasks = this.taskSearchService.filteredTasks;
  filteredCompletedTasks = computed(() =>
    this.filteredTasks().filter((task) => task.status === 'completed'),
  );
  filteredIncompleteTasks = computed(() =>
    this.filteredTasks().filter((task) => task.status === 'incomplete'),
  );

  isCompletedTaskAnimating = false;
  isSearchPage = signal(false);
  contextMenuClass = 'hidden';
  selectedTaskId!: number;
  contextMenuPosition = {
    top: ``,
    left: ``,
    position: 'absolute',
  };
  private longPressTimer?: ReturnType<typeof setTimeout>;

  constructor() {
    if (this.activatedRoute.snapshot.routeConfig?.path === 'tasks/search') {
      this.isSearchPage.set(true);
    } else {
      this.isSearchPage.set(false);
    }
  }

  ngOnInit(): void {
    this.taskStore.refreshTasks();
    this.taskStore.refreshCompletedTasks();

    document.addEventListener('click', (e) => {
      const target = e.target as HTMLElement;
      if (!target.closest('#contextMenu')) {
        this.isContextMenuOpen = false;
      }
    });
  }

  deleteTask(): void {
    this.taskStore.deleteTask(this.selectedTaskId);
    this.isContextMenuOpen = false;
    this.taskSearchService.refreshSearchResults(this.searchQuery());
  }

  editTask(): void {
    this.taskStore.selectTaskToEdit(this.selectedTaskId);
    this.taskFormService.showForm();
    this.taskFormService.startTaskEditing();

    this.taskSearchService.refreshSearchResults(this.searchQuery());
  }

  handleTouchStart(event: TouchEvent, taskId?: number): void {
    this.longPressTimer = setTimeout(() => {
      event.preventDefault();
      this.isContextMenuOpen = true;
      this.contextMenuPosition.top = `${event.touches[0].clientX / 1.6}px`;
      this.contextMenuPosition.left = ` ${event.touches[0].clientY / 2.5}px`;
      this.contextMenuClass = 'view';
      this.selectedTaskId = taskId as number;
    }, 600);
  }

  handleTouchEnd(): void {
    clearTimeout(this.longPressTimer);
  }

  openContextMenu(event: MouseEvent, taskId?: number): void {
    event.preventDefault();
    this.isContextMenuOpen = true;
    this.contextMenuPosition.top = `${event.clientY / 1.6}px`;
    this.contextMenuPosition.left = ` ${event.clientX / 2.5}px`;
    this.contextMenuClass = 'view';
    this.selectedTaskId = taskId as number;
  }

  markTaskAsCompleted(taskId: number): void {
    this.isCompletedTaskAnimating = true;
    this.taskStore.markTaskAsCompleted(taskId);
    this.taskSearchService.refreshSearchResults(this.searchQuery());
  }

  markTaskAsIncomplete(taskId: number): void {
    this.isTaskAnimating.set(true);
    this.taskStore.markTaskAsIncomplete(taskId);
    this.taskSearchService.refreshSearchResults(this.searchQuery());
  }
}
