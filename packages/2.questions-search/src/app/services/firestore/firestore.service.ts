import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { QuestionStub } from '../question-stub';

@Injectable({
  providedIn: 'root'
})
export class FirestoreService {
  constructor(
    private firestore: AngularFirestore
  ) {}

  public addQuestion(data: QuestionStub, id:number) {
    data.id = id + 1
    return this.firestore.collection('questions').add(data);    
  }
  
  public deleteQuestion(questionId: string) {
    return this.firestore.collection('questions').doc(questionId).delete()
  }
  
  public getQuestion(questionId: string) {
    return this.firestore.collection('questions').doc(questionId).snapshotChanges();
  }

  public getQuestions() {
    return this.firestore.collection('questions').snapshotChanges();
  }
}
