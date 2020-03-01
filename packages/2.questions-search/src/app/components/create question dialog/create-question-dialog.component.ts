import {Component} from '@angular/core';
import {MatDialogRef} from '@angular/material/dialog';
import { QuestionsService } from 'src/app/services/questions.service';
import { FormBuilder } from '@angular/forms';

const CURRENT_BROKER_ID = 1;

@Component({
  selector: 'create-question-dialog',
  templateUrl: './create-question-dialog.component.html',
  styleUrls: ['./create-question-dialog.component.scss']
})
export class CreateQuestionDialogComponent {
  questionForm;

  constructor(public dialogRef: MatDialogRef<CreateQuestionDialogComponent>, private questionsSvc: QuestionsService, private formBuilder: FormBuilder) {
    this.questionForm = this.formBuilder.group({
      name: '',
      phone: '',
      email: '',
      message: ''
    });
  }

  onSubmit(questionData) {
    this.questionsSvc.add({name: questionData.name, phone: questionData.phone, email: questionData.email, message: questionData.message}, CURRENT_BROKER_ID);
    this.dialogRef.close();
  }

  onCancelClick(): void {
    this.dialogRef.close();
  }
}