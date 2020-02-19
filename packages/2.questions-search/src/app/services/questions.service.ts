import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { find, switchAll, map } from 'rxjs/operators';
import { Question } from '../models/question';
import { QuestionStub } from '../models/question-stub';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { fakeQuestions } from './questions';


@Injectable({
  providedIn: 'root'
})
export class QuestionsService {

  questionsCollection: AngularFirestoreCollection<Question>;
  questions$ = new BehaviorSubject<Array<Question>>([]);
  constructor(private firestore: AngularFirestore) {
    this.questionsCollection = firestore.collection<Question>('questions');
    this.questionsCollection.snapshotChanges().pipe(
      map(actions => actions.map(a => {
        return {
          id: a.payload.doc.id,
          ...a.payload.doc.data() as Question
        };
      }))
    ).subscribe(x => this.questions$.next(x));
  }

  get() {
    return this.questions$;
  }

  add(question: QuestionStub, broker: string) {
    this.questionsCollection.add({ ...question, broker });
  }

  remove(question: Question) {
    this.questionsCollection.doc(question.id).delete();
  }

  edit(question: Question, newContent: QuestionStub) {
    this.questionsCollection.doc(question.id).update({ ...newContent });
  }

  getById(questionId: string): Observable<Question> {
    return this.questions$.pipe(
      switchAll(),
      find(q => q.id === questionId)
    );
  }

  // loadFakeData(){
  //   fakeQuestions.forEach((q, index) => { this.add({
  //     name: q.name,
  //     phone: q.phone,
  //     message: q.message,
  //     email: q.email
  //   }, q.broker)});
  // }
}
