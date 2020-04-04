import { Component, Input, OnInit } from '@angular/core';
import { Question } from 'src/app/models/question';
import { ActivatedRoute } from '@angular/router';
import { QuestionsService } from '../../../services/data/questions.service';

@Component({
  selector: 'app-question-card',
  templateUrl: './question-card.component.html',
  styleUrls: ['./question-card.component.scss']
})
export class QuestionCardComponent implements OnInit {
  question: Question;
  constructor(
              // private _route: ActivatedRoute,
              // private questionService: QuestionsService
              ) {
    //  console.log(this.questionService.getById(Number(this._route.snapshot.paramMap.get('id'))));
   }

  ngOnInit() {
  }

}
