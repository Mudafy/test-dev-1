import { Component, OnInit } from '@angular/core';
import { Question } from 'src/app/models/question';
import { ActivatedRoute } from '@angular/router';
import { QuestionsService } from '../../../services/data/questions.service';
@Component({
  selector: 'app-question-modify',
  templateUrl: './question-modify.component.html',
  styleUrls: ['./question-modify.component.scss']
})
export class QuestionModifyComponent implements OnInit {
  question: Question;
  constructor(private _route: ActivatedRoute,
              private questionService: QuestionsService) {
        this._route
        .params.subscribe( params => {
          this.questionService.getById(+params['id']).subscribe(q =>
          this.question = q);
        });
   }

  ngOnInit() {
  }

}
