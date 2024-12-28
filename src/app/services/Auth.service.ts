import { inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private router = inject(Router)
  login():void{
    localStorage.setItem('logged','true');
    this.router.navigate(['tasks']);
  }
  isLogin():boolean{
    if(localStorage.getItem('logged')){
      return true
    } else{
      this.router.navigate([''])
      return false
    }
  }
}
