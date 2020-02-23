import { Injectable, EventEmitter } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { find, switchAll } from 'rxjs/operators';
import { Question } from './question';
import { QuestionStub } from './question-stub';
import { questions } from './questions';

@Injectable({
  providedIn: 'root'
})
export class QuestionsService {
  selectedQuestion$ = new BehaviorSubject<Question>(null);
  currentAction$ = new BehaviorSubject<string>('view');
  
  questions$ = new BehaviorSubject<Array<Question>>(questions);
  constructor() { }

  add(question: QuestionStub, broker: number) {
    const allQuestions = this.questions$.getValue();
    const newId = Math.max(...allQuestions.map(q => q.id)) + 1;
    const last: Question = { ...question, broker, id: newId };
    this.questions$.next([...allQuestions, last]);
    this.updateSelectedQuestionById(newId);
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
    this.updateSelectedQuestionById(question.id);
    return of('ok');
  }

  getById(questionId: number): Observable<Question> {
    return this.questions$.pipe(
      switchAll(),
      find(q => q.id === questionId)
    );
  }

  updateSelectedQuestionById(id:number){

    if(!id){
      this.selectedQuestion$.next(null);
    }else{
      this.getById(id).subscribe(
        q => this.selectedQuestion$.next(q)
      );
    }
  }

  updateCurrentAction(action){
    this.currentAction$.next(action);
  }



}
