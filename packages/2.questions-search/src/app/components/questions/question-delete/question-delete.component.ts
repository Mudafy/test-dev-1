import { Component, OnInit, Input, Inject } from '@angular/core';
import { Question } from 'src/app/services/question';
import { QuestionsService } from 'src/app/services/questions.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-question-delete',
  templateUrl: './question-delete.component.html',
  styleUrls: ['./question-delete.component.scss']
})
export class QuestionDeleteDialogComponent implements OnInit {

  ngOnInit() {
  }
  
  constructor(
    private questionsSvc: QuestionsService,
    public dialogRef: MatDialogRef<QuestionDeleteDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public question: Question) {}

  close(): void {
    this.dialogRef.close();
  }

  deleteQuestion(item: Question) {
    this.questionsSvc.remove(item);
    this.close();
  }

}
