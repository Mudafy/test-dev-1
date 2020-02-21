import { Component, OnInit, Input, Inject } from '@angular/core';
import { QuestionsService } from '../../../../app/services/questions.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Question } from '../../../../app/models/question';
import { NotificationsService } from '../../../../app/services/notifications.service';

@Component({
  selector: 'app-question-delete',
  templateUrl: './question-delete-dialog.component.html',
  styleUrls: ['./question-delete-dialog.component.scss']
})
export class QuestionDeleteDialogComponent implements OnInit {

  ngOnInit() {
  }

  constructor(
    private questionsSvc: QuestionsService,
    public notificationsSvc: NotificationsService,
    public dialogRef: MatDialogRef<QuestionDeleteDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public question: Question) { }

  close(): void {
    this.dialogRef.close();
  }

  deleteQuestion(item: Question) {
    this.questionsSvc.remove(item);
    this.notificationsSvc.warn('La consulta ha sido eliminada.');
    this.close();
  }

}
