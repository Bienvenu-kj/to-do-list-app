import { NgIf } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';

import { AuthService } from '../../services/Auth.service';
import { FormManagerService } from '../../services/form-manager.service';
import { NotificationsService } from '../../services/notifications.service';
import { TasksManagerService } from '../../services/tasks-manager.service';
import { TaskFormComponent } from '../task-form/task-form.component';
import { ListeTachesComponent } from './liste-taches/liste-taches.component';

@Component({
  selector: 'app-taches',
  imports: [ListeTachesComponent, TaskFormComponent, NgIf],
  templateUrl: './taches.component.html',
  styleUrl: './taches.component.scss',
})
export default class TasksComponent implements OnInit {
  private tasksManager = inject(TasksManagerService);
  private authService = inject(AuthService);
  formManager = inject(FormManagerService);
  private notificationsService = inject(NotificationsService);

  ngOnInit(): void {
    const isFirstLogin = this.notificationsService.firstConnexion();
    if (isFirstLogin) {
      const userName = this.notificationsService.userName() as string;
      alert(`Bienvenue ${userName[0].toLocaleUpperCase() + userName.slice(1)}`);
      this.notificationsService.setFirstConnexion();
    }
  }

  tasks = this.tasksManager.tasks;
  completedTasks = this.tasksManager.completedTasks;

  openTaskForm(): void {
    this.formManager.onViewingForm();
  }

  openSearch(): void {
    this.authService.ilVeutRechercher();
  }
}
