import { ActivatedRoute } from '@angular/router';
import { QuestionStub } from '../../../models/question-stub';
import { Question } from '../../../models/question';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { QuestionsService } from '../../../services/data/questions.service';
import { brokers as brokerList } from '../../../services/factory/questions';

@Component({
  selector: 'app-question-maker',
  templateUrl: './question-maker.component.html',
  styleUrls: ['./question-maker.component.scss']
})
export class QuestionMakerComponent implements OnInit, OnChanges {

  questionForm = new FormGroup({
    'id': new FormControl(),
    'name': new FormControl('', [
                Validators.required
              ]),
    'email': new FormControl('', [
                Validators.required,
                Validators.pattern("[a-z0-9._%+-]+@[a-z0-9._+-]+\.[a-z]{2,3}$")
              ]),
    'phone': new FormControl(),
    'broker': new FormControl(),
    'message': new FormControl()
  });
  brokers: Array<number> = [];
  modificerOn = true;
  q:Question;
  @Input('questionId') questionId: number = null;
  constructor( private _route: ActivatedRoute,
               private questionsService: QuestionsService) {}

  ngOnInit() {

    // this.questionsService.getById(this.questionId).subscribe(q => {
    //     if ( q.id !== null){
    //       this.modificerOn = true;
    //     }
    // });
    // if (this.modificerOn) {
      this.questionsService.question$.subscribe( q => {
        this.modificerOn = true;
        this.q = q;
        console.log(q);
        this.questionForm.setValue({
          id: this.q.id,
          name: this.q.name,
          email: this.q.email,
          message: this.q.message,
          phone: this.q.phone,
          broker: this.q.broker
        });
      });
      this.brokers = brokerList;
  }
  ngOnChanges(changes) {
      // this.questionsService.getById(this.questionId).subscribe( q => {
      //   this.q = q;
      //   this.questionForm.setValue({
          // id: this.questionId,
          // name: this.q.name,
          // email: this.q.email,
          // message: this.q.message,
          // phone: this.q.phone,
          // broker: this.q.broker
      //   });
      // });
  }

  clearQuestion() {
    this.questionForm.setValue({
      id: '',
      name: '',
      email: '',
      message: '',
      phone: '',
      broker: ''
    });
  }
  loadForm() {
      this.questionsService.question$.subscribe(q => {
        this.q = q;
        this.questionForm.setValue({
          id: q.id,
          name: q.name,
          email: q.email,
          message: q.message,
          phone: q.phone,
          broker: q.broker
        });
      });
  }
  edit(): void {
    if (this.questionForm.value.name && this.questionForm.value.email) {
      let questionStuf: QuestionStub = {
        name: this.questionForm.value.name,
        phone: this.questionForm.value.phone,
        email: this.questionForm.value.email,
        message: this.questionForm.value.message,
      }
      this.questionsService.edit(this.q, questionStuf);
    }else{
      alert('El email o el nombre no estan completados.');
    }
  }
  create(): void {
    if(!brokerList.includes(this.questionForm.value.broker)) {this.questionForm.value.broker = null}
    if (this.questionForm.value.name && this.questionForm.value.email) {
      this.questionsService.add(this.questionForm.value,this.questionForm.value.broker);
    }
    this.clearQuestion();
  }

}
