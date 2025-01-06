import {
  Component,
  EventEmitter,
  inject,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import { MenuManagerService } from '../../services/menu-manager.service';
import { TasksManagerService } from '../../services/tasks-manager.service';
import { NgIf } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Taches } from '../../models/taches.model';
import { TitleStrategy } from '@angular/router';

@Component({
  selector: 'app-task-form',
  imports: [ReactiveFormsModule],
  templateUrl: './task-form.component.html',
  styleUrl: './task-form.component.scss',
})
export class TaskFormComponent implements OnInit {
  private tacheServ = inject(TasksManagerService); // inection du service de gestions de taches
  private menuManS = inject(MenuManagerService); //
  @Output() recevoirLafermeture = new EventEmitter<boolean>();
  @Output() onSoumet = new EventEmitter<boolean>();
  @Output() onAjouteTache = new EventEmitter<boolean>();
  @Input() elementAmodifier!: Taches;
  @Input() onTenteDeModier!: boolean;

  fb = inject(FormBuilder);
  cache = this.menuManS.cache;
  taskForm = this.fb.nonNullable.group({
    taskName: ['', [Validators.required]],
  });

  empty!: {};
  testeur!: number;
  ngOnInit(): void {
    if (this.onTenteDeModier) {
      const elementAinitialiser: Taches = this.elementAmodifier;
      this.taskForm.patchValue(elementAinitialiser);
    } else {
      this.taskForm.reset();
    }
    (document.getElementById('tache') as HTMLInputElement).focus();
    document.addEventListener('click', (e) => {
      const element = e.target as HTMLElement;
      if (!element.closest('#form-container')) {
        this.recevoirLafermeture.emit(false);
      }
    });
  }

  OnSubmit() {
    if (this.taskForm.valid) {
      const task: Taches = {
        ...this.taskForm.getRawValue(),
      };
      if (this.onTenteDeModier) {
        console.log(this.elementAmodifier.taskName);
        this.tacheServ.modiferTache(task);
      } else {
        this.tacheServ.ajoutTAches(task.taskName, 'Non commencée');
        this.onAjouteTache.emit(true);
      }
      this.recevoirLafermeture.emit(false);
      this.onSoumet.emit(true);
    } else {
      this.taskForm.markAllAsTouched();
    }
  }
}
