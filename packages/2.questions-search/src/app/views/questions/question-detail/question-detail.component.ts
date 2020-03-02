import { Component, OnInit } from '@angular/core';
import { QuestionsService } from 'src/app/services/questions.service';
import { Question } from 'src/app/services/question';
import { Router, ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { pluck } from 'rxjs/operators';


@Component({
  selector: 'app-question-detail',
  templateUrl: './question-detail.component.html',
  styleUrls: ['./question-detail.component.scss']
})
export class QuestionDetailComponent implements OnInit {

  question$: Observable<Question>;

  constructor(private router: Router, private activatedRoute: ActivatedRoute, private questionSvc: QuestionsService) {
    this.question$ = this.activatedRoute.data.pipe(pluck('question'));
  }

  ngOnInit() {}

  deleteQuestionAndReturnToList(question: Question){
    this.questionSvc.remove(question);
    this.router.navigate(['/questions']);
  }

}
