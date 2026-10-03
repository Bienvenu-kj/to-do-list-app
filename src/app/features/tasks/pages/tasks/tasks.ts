import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnInit,
} from '@angular/core';

import { AuthService } from '../../../../services/auth.service';
import { TaskFormService } from '../../services/task-form.service';
import { NotificationsService } from '../../../../services/notifications.service';
import { TaskStoreService } from '../../services/task-store.service';
import { TaskForm } from '../../components/task-form/task-form';
import { TaskList } from '../../components/task-list/task-list';

@Component({
  selector: 'app-tasks',
  imports: [TaskList, TaskForm],
  templateUrl: './tasks.html',
  changeDetection: ChangeDetectionStrategy.Eager,
  styleUrl: './tasks.scss',
})
export default class Tasks implements OnInit {
  private taskStore = inject(TaskStoreService);
  private authService = inject(AuthService);
  taskFormService = inject(TaskFormService);
  private notificationsService = inject(NotificationsService);

  ngOnInit(): void {
    const isFirstLogin = this.notificationsService.isFirstLogin();
    if (isFirstLogin) {
      const userName = this.notificationsService.userName() as string;
      alert(`Bienvenue ${userName[0].toLocaleUpperCase() + userName.slice(1)}`);
      this.notificationsService.setFirstLogin();
    }
  }

  tasks = this.taskStore.tasks;
  completedTasks = this.taskStore.completedTasks;

  openTaskForm(): void {
    this.taskFormService.showForm();
  }

  openSearch(): void {
    this.authService.startSearch();
  }
}
