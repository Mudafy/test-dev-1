import { ActivatedRoute } from '@angular/router';
import { QuestionStub } from '../../../models/question-stub';
import { Question } from '../../../models/question';
import { FormGroup, FormControl, Validators, FormGroupDirective, NgForm } from '@angular/forms';
import { Component, OnInit, Input } from '@angular/core';
import { QuestionsService } from '../../../services/data/questions.service';
import { ErrorStateMatcher } from '@angular/material/core';
import { brokers as brokerList } from '../../../services/factory/questions';

@Component({
  selector: 'app-question-maker',
  templateUrl: './question-maker.component.html',
  styleUrls: ['./question-maker.component.scss']
})
export class QuestionMakerComponent implements OnInit {

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
  modificerOn = false;
  q:Question;
  @Input('questionId') questionId: number = null;
  constructor( private _route: ActivatedRoute,
               private questionsService: QuestionsService) {
    this._route
      .params.subscribe( params => {
            this.questionsService.getById(+params['id']).subscribe(q =>{
              this.questionId = q.id;
              if( q.id !== null){
                this.modificerOn = true;
              }
          });
    });
    if (this.modificerOn) {
      this.questionsService.getById(this.questionId).subscribe( q => {
        this.q = q;
      });
      this.questionForm.setValue({
        id: this.questionId,
        name: this.q.name,
        email: this.q.email,
        message: this.q.message,
        phone: this.q.phone,
        broker: this.q.broker
      });
    }
    this.brokers = brokerList;
  }

  ngOnInit() {
  }
  clearQuestion() {
    this.questionForm.setValue({
      id: '',
      name: '',
      email: '',
      message: '',
      phone: '',
      broker: ''
    })
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
