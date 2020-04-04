import { Component, OnInit } from '@angular/core';
import { SidebarService } from '../../services/shared/sidebar.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {
  menu: any;
  constructor( sidebarService: SidebarService) {
    this.menu = sidebarService.menu;
   }

  ngOnInit() {
  }

}
