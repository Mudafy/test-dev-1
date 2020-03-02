import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { QuestionsService } from 'src/app/services/questions.service';
import { Question } from 'src/app/services/question';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class QuestionDetailResolver implements Resolve<Question> {
  constructor(private questionSvc: QuestionsService) {}

  resolve(route: ActivatedRouteSnapshot): Observable<Question> {
    return this.questionSvc.getById(parseInt(route.paramMap.get('id'))).pipe(take(1));
  }
}