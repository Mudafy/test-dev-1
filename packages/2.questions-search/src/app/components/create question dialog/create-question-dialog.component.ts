import {Component} from '@angular/core';
import {MatDialogRef} from '@angular/material/dialog';
import { QuestionsService } from 'src/app/services/questions.service';
import { QuestionStub } from 'src/app/services/question-stub';

@Component({
  selector: 'create-question-dialog',
  templateUrl: './create-question-dialog.component.html',
  styleUrls: ['./create-question-dialog.component.scss']
})
export class CreateQuestionDialogComponent {

  name: string;
  phone: string;
  email: string;
  message: string;

  constructor(public dialogRef: MatDialogRef<CreateQuestionDialogComponent>, private questionsSvc: QuestionsService) {}

  onCreateClick(): void{
    this.questionsSvc.add({name: this.name, phone: this.phone, email: this.email, message: this.message}, 2);
    this.dialogRef.close();
  }

  onCancelClick(): void {
    this.dialogRef.close();
  }
}