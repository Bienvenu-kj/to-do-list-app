import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';

import { Task } from '../../models/task.model';
import { FormManagerService } from '../../services/form-manager.service';
import { MenuManagerService } from '../../services/menu-manager.service';
import { NotificationsService } from '../../services/notifications.service';
import { TasksManagerService } from '../../services/tasks-manager.service';

@Component({
  selector: 'app-task-form',
  imports: [ReactiveFormsModule],
  templateUrl: './task-form.component.html',
  styleUrl: './task-form.component.scss',
})
export class TaskFormComponent implements OnInit {
  private tacheServ = inject(TasksManagerService); // inection du service de gestions de taches
  private menuManS = inject(MenuManagerService); //
  private notificationServ = inject(NotificationsService);
  private formManager = inject(FormManagerService);
  private fb = inject(FormBuilder);

  elementAmodifier = this.tacheServ.elementAmodifier;
  onTenteDeModier = this.formManager.needToModifyAtask;

  taskForm = this.fb.nonNullable.group({
    taskName: ['', [Validators.required]],
    notification: '',
  });
  empty!: {};
  testeur!: number;

  ngOnInit(): void {
    if (this.onTenteDeModier()) {
      const elementAinitialiser: Task = this.elementAmodifier();
      this.taskForm.patchValue(elementAinitialiser);
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
        this.formManager.actualiseModificateurs();
        console.log('on est en form task');
      }
    });
  }

  OnSubmit() {
    if (this.taskForm.valid) {
      const task: Task = {
        ...this.taskForm.getRawValue(),
      };
      if (task.notification) {
        if (this.formManager.approuveLaDate(task.notification as string)) {
          this.notificationServ.pushNotificationForDoingTask(task);
          if (this.onTenteDeModier()) {
            this.tacheServ.modiferTache(task);
          } else {
            this.tacheServ.ajoutTAches(task);
            console.log(task);
          }
          this.formManager.actualiseModificateurs();
        }
      } else {
        if (this.onTenteDeModier()) {
          this.tacheServ.modiferTache(task);
        } else {
          this.tacheServ.ajoutTAches(task);
          console.log(task);
        }
        this.formManager.actualiseModificateurs();
      }
    } else {
      this.taskForm.markAllAsTouched();
    }
  }
}
