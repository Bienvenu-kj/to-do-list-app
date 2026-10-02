import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnInit,
} from '@angular/core';

import { AuthService } from '../../services/auth.service';
import { FormManagerService } from '../../services/form-manager.service';
import { NotificationsService } from '../../services/notifications.service';
import { TasksManagerService } from '../../services/tasks-manager.service';
import { TaskFormComponent } from '../task-form/task-form.component';
import { TaskListComponent } from './task-list/task-list.component';

@Component({
  selector: 'app-tasks',
  imports: [TaskListComponent, TaskFormComponent],
  templateUrl: './tasks.component.html',
  changeDetection: ChangeDetectionStrategy.Eager,
  styleUrl: './tasks.component.scss',
})
export default class TasksComponent implements OnInit {
  private tasksManager = inject(TasksManagerService);
  private authService = inject(AuthService);
  formManager = inject(FormManagerService);
  private notificationsService = inject(NotificationsService);

  ngOnInit(): void {
    const isFirstLogin = this.notificationsService.isFirstLogin();
    if (isFirstLogin) {
      const userName = this.notificationsService.userName() as string;
      alert(`Bienvenue ${userName[0].toLocaleUpperCase() + userName.slice(1)}`);
      this.notificationsService.setFirstLogin();
    }
  }

  tasks = this.tasksManager.tasks;
  completedTasks = this.tasksManager.completedTasks;

  openTaskForm(): void {
    this.formManager.showForm();
  }

  openSearch(): void {
    this.authService.startSearch();
  }
}
