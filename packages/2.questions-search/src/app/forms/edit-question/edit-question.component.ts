import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { QuestionsService } from 'src/app/services/questions.service';
import { QuestionStub } from 'src/app/services/question-stub';
import { Router } from "@angular/router";
import { CustomErrorStateMatcher } from '../custom-error-matcher';
import { numberValidator } from '../validators/number-validator';
import { Question } from 'src/app/services/question';
import { questions } from 'src/app/services/questions';

@Component({
  selector: 'app-edit-question',
  templateUrl: './edit-question.component.html',
  styleUrls: ['./edit-question.component.scss']
})
export class EditQuestionComponent implements OnInit {

  question: Question = questions[0];
  nameFormControl = new FormControl('', [
    Validators.required,
  ]);
  phoneFormControl = new FormControl('', []);
  emailFormControl = new FormControl('', [
    Validators.required,
    Validators.email,
  ]);
  questionFormControl = new FormControl('', []);
  brokerFormControl = new FormControl('', [
    Validators.required,
    numberValidator
  ]);
  matcher = new CustomErrorStateMatcher;

  constructor(private questionsService: QuestionsService, private router: Router) { 
  }

  ngOnInit() {
  }
  isValidForm(): boolean {
    if (this.emailFormControl.valid && this.nameFormControl.valid && this.brokerFormControl.valid) {
      return true;
    }
    return false;
    
  }
  onSubmit() {
    if (this.isValidForm()) {
      let newQuestion: QuestionStub = {
        'name': this.nameFormControl.value,
        'phone': this.phoneFormControl.value ? this.phoneFormControl.value : undefined,
        'email': this.emailFormControl.value,
        'message': this.questionFormControl.value ? this.questionFormControl.value : undefined,
      }
      this.questionsService.add(newQuestion, this.brokerFormControl.value);
      this.router.navigate(['/', 'questions']);
    }
  }
}
  