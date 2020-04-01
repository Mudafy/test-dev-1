import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SidebarService {
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
}
