import { Component, OnInit } from '@angular/core';
import { SidebarService } from '../../services/shared/sidebar.service';
import { QuestionsService } from '../../services/data/questions.service';
import { Question } from 'src/app/models/question';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {
  menu: any;
  questions: Array<Question> = [];
  constructor( sidebarService: SidebarService,
               questionsService: QuestionsService) {
    questionsService.questions$.subscribe(q => this.questions = q);
    this.menu = sidebarService.menu;
   }
  // applyFilter(event: Event) {
  //   const filterValue = (event.target as HTMLInputElement).value;
  //   console.log(filterValue.length);
  //   this.questions.filter(q => q.name == filterValue)// this.questions.filter = filterValue.trim().toLowerCase();
  // }
  ngOnInit() {
  }

}
