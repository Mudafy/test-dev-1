import { Injectable } from '@angular/core';
import { brokers } from './brokers';
import { Broker } from '../models/broker';
import { Observable, BehaviorSubject } from 'rxjs';
import { switchAll, find } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class BrokersService {

  brokers$ = new BehaviorSubject<Array<Broker>>(brokers);
  constructor() { }

  getById(brokerId: number): Observable<Broker> {
    return this.brokers$.pipe(
      switchAll(),
      find(b => b.id == brokerId)
    );
  }
}
