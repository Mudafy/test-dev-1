import { Component } from '@angular/core';
import { SidebarService } from './services/shared/sidebar.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'test-questions-search';
  open: boolean = true;
  constructor(sidebar: SidebarService){
      sidebar.open$.subscribe( q => {
        this.open = q;
      } );
  }

}
