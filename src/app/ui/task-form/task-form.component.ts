import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnInit,
} from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';

import { TaskInput } from '../../models/task.model';
import { FormManagerService } from '../../services/form-manager.service';
import { NotificationsService } from '../../services/notifications.service';
import { TasksManagerService } from '../../services/tasks-manager.service';

@Component({
  selector: 'app-task-form',
  imports: [ReactiveFormsModule],
  templateUrl: './task-form.component.html',
  changeDetection: ChangeDetectionStrategy.Eager,
  styleUrl: './task-form.component.scss',
})
export class TaskFormComponent implements OnInit {
  private tasksManager = inject(TasksManagerService);
  private notificationsService = inject(NotificationsService);
  private formManager = inject(FormManagerService);
  private fb = inject(FormBuilder);

  taskToEdit = this.tasksManager.taskToEdit;
  isEditingTask = this.formManager.isEditingTask;

  taskForm = this.fb.nonNullable.group({
    taskName: ['', [Validators.required]],
    notification: '',
  });
  ngOnInit(): void {
    if (this.isEditingTask()) {
      const taskToInitialize = this.taskToEdit();
      if (taskToInitialize) {
        this.taskForm.patchValue(taskToInitialize);
      }
    } else {
      this.taskForm.reset();
    }
    (document.getElementById('tache') as HTMLInputElement).focus();
    document.addEventListener('click', (e) => {
      const element = e.target as HTMLElement;
      if (
        !element.closest('#form-container') &&
        !element.closest('#addTask') &&
        !element.closest('#contextMenu')
      ) {
        this.formManager.resetFormState();
        console.log('on est en form task');
      }
    });
  }

  onSubmit(): void {
    if (this.taskForm.valid) {
      const task: TaskInput = {
        ...this.taskForm.getRawValue(),
      };
      if (task.notification) {
        if (this.formManager.isNotificationDateValid(task.notification)) {
          this.notificationsService.scheduleTaskNotification(task);
          if (this.isEditingTask()) {
            this.tasksManager.updateTask(task);
          } else {
            this.tasksManager.addTask(task);
            console.log(task);
          }
          this.formManager.resetFormState();
        }
      } else {
        if (this.isEditingTask()) {
          this.tasksManager.updateTask(task);
        } else {
          this.tasksManager.addTask(task);
          console.log(task);
        }
        this.formManager.resetFormState();
      }
    } else {
      this.taskForm.markAllAsTouched();
    }
  }
}
