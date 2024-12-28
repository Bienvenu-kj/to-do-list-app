import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MenuManagerService {

  cache=true;
  basculeEnVrai= ()=>this.cache=true;
  
  basculeEnFaux= ()=>this.cache=true;
  inverse(){
    return this.cache = !this.cache
  }
}
