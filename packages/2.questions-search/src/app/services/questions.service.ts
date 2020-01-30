import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { find, switchAll } from 'rxjs/operators';
import { Question } from './question';
import { QuestionStub } from './question-stub';
import { questions } from './questions';


@Injectable({
  providedIn: 'root'
})
export class QuestionsService {

  questionsSource = questions;

  //observers
  questions$ = new BehaviorSubject<Array<Question>>(this.questionsSource);
  questionDetails$ = new BehaviorSubject<Question>(null);

  constructor() { }


  filterByQuestion(valueName: string, valuePhone: string, valueEmail: string) {

    this.questions$.next(this.questionsSource.filter(q => q.name.includes(valueName)
      && q.phone.includes(valuePhone)
      && q.email.includes(valueEmail)));
    
  }

  cleanFilters()
  {
    this.questions$.next(this.questionsSource);
  }

  add(question: QuestionStub, broker: number) {

    const lastId = Math.max(...this.questionsSource.map(q => q.id));
    const last: Question = { ...question, broker, id: lastId + 1 };
    this.questionsSource.push(last);
    this.questions$.next(this.questionsSource);
  }

  remove(question: Question) {
    this.questionsSource = this.questionsSource.filter(q => q.id !== question.id);
    this.questions$.next(this.questionsSource);
    return of('ok');
  }

  edit(question: Question, newContent: QuestionStub) {
    this.questionsSource.map(q => {
        if (q.id === question.id) {
          // return { ...question, ...newContent };
          q.name = newContent.name;
          q.phone = newContent.phone;
          q.message = newContent.message;
          q.email = newContent.email;
        }
        return q;
      });
    this.questions$.next(this.questionsSource);
    // return of('ok');
  }

  getById(questionId: number): Observable<Question> {
    return this.questions$.pipe(
      switchAll(),
      find(q => q.id === questionId)
    );
  }

  goToDetails(question: Question){
    this.questionDetails$.next(question);
  }

}
