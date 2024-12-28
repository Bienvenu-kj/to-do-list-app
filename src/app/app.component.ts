import { CommonModule} from '@angular/common';
import { Component} from '@angular/core';
import { RouterOutlet, TitleStrategy } from '@angular/router';


@Component({
  selector: 'app-root',
  imports: [RouterOutlet,CommonModule],
  templateUrl: './app.component.html',
  styles: ``,
})
export class AppComponent {
  
}
