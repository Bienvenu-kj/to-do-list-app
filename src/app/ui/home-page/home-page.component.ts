import { Component, inject } from '@angular/core';
import { AuthService } from '../../services/Auth.service';
import { NotificationsService } from '../../services/notifications.service';

@Component({
  selector: 'app-home-page',
  imports: [],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.scss',
})
export default class HomePageComponent {
  constructor(private Auth: AuthService,private notifServ:NotificationsService) {}

  login(e: MouseEvent,champPrenom:HTMLInputElement) {
    e.preventDefault();
    if(champPrenom.value){
      this.notifServ.setFirstConnexion(true,champPrenom.value);
    }
    this.Auth.login();

  }
}
