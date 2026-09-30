import { Injectable, signal, WritableSignal } from '@angular/core';
import { Subject, timer } from 'rxjs';
import { Taches } from '../models/taches.model';

@Injectable({
  providedIn: 'root'
})
export class NotificationsService {

  constructor() { 

  }
  firstConnexion = signal(false);
  userName:WritableSignal<string|undefined> = signal('');
  setFirstConnexion(state=false,username?:string){
  this.firstConnexion.set(state);

  if(username) this.userName.set(username);
  }
 
  notification = new Subject<string>();
  setNotification(date:Date|number,tache:Taches){
    timer(date).subscribe({
      next:()=>{
        new Notification(`Il est temps pour vous de faire votre tache : "${tache.taskName}"`
        )
      }
    })
  }
  dayOfTheWeek(dayOfTheWeek:number){
    let dayofTheWeek:string|null=null;
    switch(dayOfTheWeek){
      case 1:
        dayofTheWeek = "Lundi";
      break;
      case 2:
        dayofTheWeek = "Mardi";
      break;
      case 3:
        dayofTheWeek = "Mercred";
      break;
      case 4:
        dayofTheWeek = "Jeudi";
      break;
      case 5:
        dayofTheWeek = "Vendredi";
      break;
      case 6:
        dayofTheWeek = "Samedi";
      break;
      case 7:
        dayofTheWeek = "Dimanche";
      break;        
    }
    return dayofTheWeek as string;
  }
  pushNotificationForDoingTask(Userdata:Taches){
    if(Userdata.notification){
      const date = new Date(Userdata.notification);
    // on verifie si la date est bien correcte
    if(isNaN(date.getTime())){
      console.log("Invalide date");
    }else{
      // on verifie si le navigateur supporte les notifications
      if(!("Notification" in window)){
        console.log("Votre navigateur ne supporte pase les notifications");
        return;
      } 
      // on demande la permission avant de continuer 
      Notification.requestPermission().then(permission=>{
        if (permission === "granted"){
          // console.log("Now : "+ new Date().getTime());
          // console.log("Future time : "+ date.getTime());
          // console.log("Difference : "+ (date.getTime()-new Date().getTime()));
          new Notification("Vous avez défini une notification pour votre tâche",{
            body : `Nous allons vous notifier quand ce temps (${this.dayOfTheWeek(date.getDay())} ${date.getDate().toString().padStart(2,"0")}/${(date.getMonth()+1).toString().padStart(2,"0")}/${date.getFullYear()} ${date.getHours().toString().padStart(2,"0")}:${date.getMinutes().toString().padStart(2,"0")}) arriveras ! `,
            icon:"favicon.ico",
            
            requireInteraction : true,
            tag: `${Userdata.id}`
          })
          this.setNotification(date,Userdata); 
        }else{
          alert("Permission refusée")
        }
      })
    }
  }else{
    console.log("Pas de notification définie pour cette tâche !")
  }
}
}
