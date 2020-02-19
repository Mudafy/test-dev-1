import { Injectable } from '@angular/core';
import { Broker } from '../models/broker';
import { Observable, BehaviorSubject } from 'rxjs';
import { switchAll, find, map } from 'rxjs/operators';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class BrokersService {

  brokerssCollection: AngularFirestoreCollection<Broker>;
  brokers$ = new BehaviorSubject<Array<Broker>>([]);
  constructor(private firestore: AngularFirestore) {
    this.brokerssCollection = firestore.collection<Broker>('brokers');
    this.brokerssCollection.snapshotChanges().pipe(
      map(actions => actions.map(a => {
        return {
          id: a.payload.doc.id,
          ...a.payload.doc.data() as Broker
        };
      }))
    ).subscribe(x => this.brokers$.next(x));
  }

  get() {
    return this.brokers$;
  }

  getById(brokerId: string): Observable<Broker> {
    return this.get().pipe(
      switchAll(),
      find(b => b.id === brokerId)
    );
  }

  getBrokerNameById(brokerId: string): Observable<string> {
    return this.getById(brokerId).pipe(
      map(x => x.name)
    );
  }
}
