import { Component, inject } from '@angular/core';
import { AuthService } from '../../services/Auth.service';

@Component({
  selector: 'app-home-page',
  imports: [],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.scss' 
})
export default class HomePageComponent {
  constructor (private Auth:AuthService){}

  login(e:MouseEvent){
    e.preventDefault();
    this.Auth.login();
  }
}
