import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { find, switchAll, filter } from 'rxjs/operators';
import { Question } from './question';
import { QuestionStub } from './question-stub';
import { questions } from './questions';


@Injectable({
  providedIn: 'root'
})
export class QuestionsService {

  questions$ = new BehaviorSubject<Array<Question>>(questions);
  constructor() { }

  add(question: QuestionStub, broker: number): Observable<string> {
    const allQuestions = this.questions$.getValue();
    const lastId = Math.max(...allQuestions.map(q => q.id));
    const last: Question = { ...question, broker, id: lastId + 1 };
    this.questions$.next([...allQuestions, last]);
    return of('ok');
  }

  remove(question: Question) {
    const allQuestions = this.questions$.getValue();
    this.questions$.next(allQuestions.filter(q => q.id !== question.id));
    return of('ok');
  }

  edit(question: Question, newContent: QuestionStub): Observable<string> {
    const allQuestions = this.questions$.getValue()
      .map(q => {
        if (q.id === question.id) {
          return { ...question, ...newContent };
        }
        return q;
      });
    this.questions$.next(allQuestions);
    return of('ok');
  }

  getById(questionId: number): Observable<Question> {
    const requestedQuestion = this.questions$.value.find(question => question.id === questionId);
    return of (requestedQuestion);
  }

}
