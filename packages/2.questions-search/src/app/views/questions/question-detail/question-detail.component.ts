import { Component, OnInit } from '@angular/core';
import { Question } from 'src/app/services/question';
import { QuestionsService } from 'src/app/services/questions.service';

@Component({
  selector: 'app-question-detail',
  templateUrl: './question-detail.component.html',
  styleUrls: ['./question-detail.component.scss']
})
export class QuestionDetailComponent implements OnInit {

  selectedQuestion: Question;
  constructor(private questionService: QuestionsService) { }

  ngOnInit() {
    this.questionService.selectedQuestion.subscribe( 
      (q: Question)=>{
        this.selectedQuestion = q;
      }
    )
  }

}
