import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of, Subject } from 'rxjs';
import { find, switchAll } from 'rxjs/operators';
import { Question } from '../../models/question';
import { QuestionStub } from '../../models/question-stub';
import { questions } from '../factory/questions';


@Injectable({
  providedIn: 'root'
})
export class QuestionsService {

  questions$ = new BehaviorSubject<Array<Question>>(questions);
  question$ = new Subject<Question>();
  constructor() { }

  setQuestion(question: Question) {
     this.question$.next(question);
  }
  add(question: QuestionStub, broker: number) {
    const allQuestions = this.questions$.getValue();
    const lastId = Math.max(...allQuestions.map(q => q.id));
    const last: Question = { ...question, broker, id: lastId + 1 };
    this.questions$.next([...allQuestions, last]);
  }

  remove(question: Question) {
    const allQuestions = this.questions$.getValue();
    this.questions$.next(allQuestions.filter(q => q.id !== question.id));
    return of('ok');
  }

  edit(question: Question, newContent: QuestionStub) {
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
    return this.questions$.pipe(
      switchAll(),
      find(q => q.id === questionId)
    );
  }

}
