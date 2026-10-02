import { ChangeDetectionStrategy, Component } from '@angular/core';

import { AuthService } from '../../services/auth.service';
import { NotificationsService } from '../../services/notifications.service';

@Component({
  selector: 'app-home-page',
  imports: [],
  templateUrl: './home-page.component.html',
  changeDetection: ChangeDetectionStrategy.Eager,
  styleUrl: './home-page.component.scss',
})
export default class HomePageComponent {
  constructor(
    private authService: AuthService,
    private notificationsService: NotificationsService,
  ) {}

  login(event: MouseEvent, firstNameInput: HTMLInputElement): void {
    event.preventDefault();
    if (firstNameInput.value) {
      this.notificationsService.setFirstLogin(true, firstNameInput.value);
    }
    this.authService.login();
  }
}
