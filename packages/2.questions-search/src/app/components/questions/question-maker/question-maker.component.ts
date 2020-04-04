import { FormGroup, FormControl, Validators, FormGroupDirective, NgForm } from '@angular/forms';
import { Component, OnInit, Input } from '@angular/core';
import { Question } from '../../../models/question';
import { QuestionsService } from '../../../services/data/questions.service';
import { ErrorStateMatcher } from '@angular/material/core';
import { brokers as brokerList, brokers } from '../../../services/factory/questions';

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}


@Component({
  selector: 'app-question-maker',
  templateUrl: './question-maker.component.html',
  styleUrls: ['./question-maker.component.scss']
})
export class QuestionMakerComponent implements OnInit {

  // @Input(question)


  matcher = new MyErrorStateMatcher();
  question: Question = {
    name:"",
    email: "",
    phone: "",
    message: "",
    broker: null
  };
  brokers: Array<number> = [];
  questionForm:FormGroup;



  constructor(private questionsService: QuestionsService) {
    this.brokers = brokerList;
    this.questionForm = new FormGroup({
      'name': new FormControl('', [
                  Validators.required
                ]),
      'email': new FormControl('', [
                  Validators.required,
                  Validators.pattern("[a-z0-9._%+-]+@[a-z0-9._+-]+\.[a-z]{2,3}$")
                ]),
      'phone': new FormControl(),
      'broker': new FormControl('',[
                  Validators.required,
                  // this.containBroker
                ]),
      'message': new FormControl()
    });
  }

  ngOnInit() {
  }
  clearQuestion() {}
  create(): void {
    if(!brokerList.includes(this.questionForm.value.broker)) this.questionForm.value.broker = null;
    if (this.questionForm.value.name && this.questionForm.value.email) {
      this.questionsService.add(this.questionForm.value,this.questionForm.value.broker);
    }
  }

}
