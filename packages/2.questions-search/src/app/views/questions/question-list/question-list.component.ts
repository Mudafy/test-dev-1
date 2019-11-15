import { Component, OnInit } from '@angular/core';
import { Question } from 'src/app/services/question';
import { QuestionsService } from 'src/app/services/questions.service';

@Component({
  selector: 'app-question-list',
  templateUrl: './question-list.component.html',
  styleUrls: ['./question-list.component.scss']
})
export class QuestionListComponent implements OnInit {

  questions: Array<Question>;
  constructor(questionsSvc: QuestionsService) {
    questionsSvc.questions$.subscribe(q => {
      this.questions = q;
    });
  }

  ngOnInit() {
  }


  getQuestionId(index: number, item: Question): number {
    return item.id;
  }
}
