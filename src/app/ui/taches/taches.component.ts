import { CommonModule, NgIf } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';

import { AuthService } from '../../services/Auth.service';
import { FormManagerService } from '../../services/form-manager.service';
import { MenuManagerService } from '../../services/menu-manager.service';
import { NotificationsService } from '../../services/notifications.service';
import { TasksManagerService } from '../../services/tasks-manager.service';
import { TaskFormComponent } from '../task-form/task-form.component';
import { ListeTachesComponent } from './liste-taches/liste-taches.component';

@Component({
  selector: 'app-taches',
  imports: [CommonModule, ListeTachesComponent, TaskFormComponent, NgIf],
  templateUrl: './taches.component.html',
  styleUrl: './taches.component.scss',
})
export default class TachesComponent implements OnInit {
  private tacheServ = inject(TasksManagerService); // inection du service de gestions de taches
  private authServ = inject(AuthService); // inection du service de gestions de taches
  formManager = inject(FormManagerService);
  private notifServ = inject(NotificationsService);
  constructor(private menuManS: MenuManagerService) {} // injection du service de gestion des menus
  ngOnInit(): void {
    const firstConnexion = this.notifServ.firstConnexion();
    if (firstConnexion) {
      const userName = this.notifServ.userName() as string;
      alert(`Bienvenue ${userName[0].toLocaleUpperCase() + userName.slice(1)}`);
      this.notifServ.setFirstConnexion();
    }
  }
  tachesBrutes = this.tacheServ.taches;
  tacheTerminees = this.tacheServ.tachesTerminees;

  champsRecherche!: HTMLInputElement;

  ajouterTache() {
    this.formManager.onViewingForm();
  }

  onVeutOuOnVeutPlusRechercher() {
    this.authServ.ilVeutRechercher();
  }
}
