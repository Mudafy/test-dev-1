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
  w;
  @Input('question') question: Question;
  constructor(private _route: ActivatedRoute,
              private questionService: QuestionsService) {
      this._route
        .params.subscribe( params => {
          this.w = +params['id'];
        });
      questionService.getById(this.w).subscribe(q =>{
          this.question = q
        });
        // console.log(this.question);
   }
  ngOnInit() {
  }

}
