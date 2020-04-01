import { Component, OnInit } from '@angular/core';
import { QuestionsService } from '../../services/data/questions.service';
import { Question } from '../../models/question';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  questions: number = 0;
  newConsult: boolean = false;
  constructor(questionsSvc: QuestionsService) { 
    questionsSvc.questions$.subscribe(q => {
      this.questions = q.length;

    });
  }

  ngOnInit() {
  }

}
