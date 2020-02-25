import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { find, switchAll } from 'rxjs/operators';
import { Question } from './question';
import { QuestionStub } from './question-stub';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { LoginService } from './login.service';

@Injectable({
  providedIn: 'root'
})
export class QuestionsService {
  //API ENDPOINTS
  QUESTIONS_ENPOINTS = 'http://0.0.0.0:8000/questions';
 
  selectedQuestion$ = new BehaviorSubject<Question>(null);
  currentAction$ = new BehaviorSubject<string>('view');
  
  questions$ = new BehaviorSubject<Array<Question>>([]);

  constructor(private httpClient: HttpClient, private loginService: LoginService) {}

  add(question: QuestionStub, broker: number) {

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'Authorization': this.loginService.authToken.access_token
      })
    }

    this.httpClient.post<Question>(this.QUESTIONS_ENPOINTS, {...question, broker } ,httpOptions)
      .subscribe(response => {
        const allQuestions = this.questions$.getValue();
        this.questions$.next([...allQuestions, response]);
        this.updateSelectedQuestionById(response.id);
      });

  }

  remove(question: Question) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'Authorization': this.loginService.authToken.access_token
      })
    }

    this.httpClient.delete<Question>(this.QUESTIONS_ENPOINTS+`/${question.id}`, httpOptions)
      .subscribe(response => {
        if(response == null) return of ('nothing to delete');

        const allQuestions = this.questions$.getValue();
        this.questions$.next(allQuestions.filter(q => q.id !== question.id));

        const selectedQuestion = this.selectedQuestion$.value;
        
        //If there was a question selected AND it's the one being deleted, then unselect it
        if(selectedQuestion && question.id == selectedQuestion.id){
          this.updateSelectedQuestionById(null);
        }

        return of('ok');
      });
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
    if(id === null){
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

  getAllQuestions(){
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'Authorization': this.loginService.authToken.access_token
      })
    }

    this.httpClient.get<Array<Question>>(this.QUESTIONS_ENPOINTS, httpOptions)
    .subscribe(response => {
      this.questions$.next(response)
    })
  }

}
