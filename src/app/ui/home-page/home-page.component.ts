import { Component } from '@angular/core';

import { AuthService } from '../../services/auth.service';
import { NotificationsService } from '../../services/notifications.service';

@Component({
  selector: 'app-home-page',
  imports: [],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.scss',
})
export default class HomePageComponent {
  constructor(
    private authService: AuthService,
    private notifServ: NotificationsService,
  ) {}

  login(e: MouseEvent, champPrenom: HTMLInputElement) {
    e.preventDefault();
    if (champPrenom.value) {
      this.notifServ.setFirstConnexion(true, champPrenom.value);
    }
    this.authService.login();
  }
}
