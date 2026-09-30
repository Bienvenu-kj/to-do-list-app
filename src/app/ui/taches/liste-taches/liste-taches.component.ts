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
export class TaskListComponent implements OnInit {
  private tasksManager = inject(TasksManagerService);
  private taskSearchService = inject(TaskSearchService);
  private activatedRoute = inject(ActivatedRoute);
  private formManager = inject(FormManagerService);

  @Input() isContextMenuOpen = false;

  searchQuery = this.taskSearchService.searchQuery;

  isTaskAnimating = signal(false);
  isFormVisible = this.formManager.isFormVisible;
  completedTasks = this.tasksManager.completedTasks;
  tasks = this.tasksManager.tasks;

  filteredTasks = this.taskSearchService.filteredTasks;
  filteredCompletedTasks = computed(() =>
    this.filteredTasks().filter(
      (task) => task.etat?.toLocaleLowerCase() === 'terminée',
    ),
  );
  filteredIncompleteTasks = computed(() =>
    this.filteredTasks().filter(
      (task) => task.etat?.toLocaleLowerCase() === 'non terminée',
    ),
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
    if (this.activatedRoute.component?.name === '_ResearchComponent') {
      this.isSearchPage.set(true);
    } else {
      this.isSearchPage.set(false);
    }
  }

  ngOnInit(): void {
    this.tasksManager.refreshTasks();
    this.tasksManager.refreshCompletedTasks();

    document.addEventListener('click', (e) => {
      const target = e.target as HTMLElement;
      if (!target.closest('#contextMenu')) {
        this.isContextMenuOpen = false;
      }
    });
  }

  deleteTask(): void {
    this.tasksManager.deleteTask(this.selectedTaskId);
    this.isContextMenuOpen = false;
    this.taskSearchService.refreshSearchResults(this.searchQuery());
  }

  editTask(): void {
    this.tasksManager.selectTaskToEdit(this.selectedTaskId);
    this.formManager.showForm();
    this.formManager.startTaskEditing();

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

  markTaskAsCompleted(taskId: number | undefined): void {
    this.isCompletedTaskAnimating = true;
    this.tasksManager.markTaskAsCompleted(taskId);
    this.taskSearchService.refreshSearchResults(this.searchQuery());
  }

  markTaskAsIncomplete(taskId: number | undefined): void {
    this.isTaskAnimating.set(true);
    this.tasksManager.markTaskAsIncomplete(taskId);
    this.taskSearchService.refreshSearchResults(this.searchQuery());
  }
}
