import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnInit,
} from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';

import { TaskInput } from '../../models/task.model';
import { TaskFormService } from '../../services/task-form.service';
import { NotificationsService } from '../../../../services/notifications.service';
import { TaskStoreService } from '../../services/task-store.service';

@Component({
  selector: 'app-task-form',
  imports: [ReactiveFormsModule],
  templateUrl: './task-form.html',
  changeDetection: ChangeDetectionStrategy.Eager,
  styleUrl: './task-form.scss',
})
export class TaskForm implements OnInit {
  private taskStore = inject(TaskStoreService);
  private notificationsService = inject(NotificationsService);
  private taskFormService = inject(TaskFormService);
  private fb = inject(FormBuilder);

  taskToEdit = this.taskStore.taskToEdit;
  isEditingTask = this.taskFormService.isEditingTask;

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
        this.taskFormService.resetFormState();
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
        if (this.taskFormService.isNotificationDateValid(task.notification)) {
          this.notificationsService.scheduleTaskNotification(task);
          if (this.isEditingTask()) {
            this.taskStore.updateTask(task);
          } else {
            this.taskStore.addTask(task);
            console.log(task);
          }
          this.taskFormService.resetFormState();
        }
      } else {
        if (this.isEditingTask()) {
          this.taskStore.updateTask(task);
        } else {
          this.taskStore.addTask(task);
          console.log(task);
        }
        this.taskFormService.resetFormState();
      }
    } else {
      this.taskForm.markAllAsTouched();
    }
  }
}
