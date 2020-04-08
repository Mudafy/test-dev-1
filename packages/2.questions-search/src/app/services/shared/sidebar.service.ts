import { Injectable } from '@angular/core';
import { BehaviorSubject, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SidebarService {
  open$ = new BehaviorSubject<boolean>(true);
  menu: any = [
    {
      title: 'Consultas',
      icon: 'question_answer',
      submenu: [
        {titulo: 'Todas', url: '/questions', icon: 'list'},
        {titulo: 'Crear', url: '/questions/create', icon: 'create'},
      ]
     }
  ];
  constructor() { }


  openCloseSidebar(){
    this.open$.next(!this.open$.getValue());
    return of('ok');
  }

}
