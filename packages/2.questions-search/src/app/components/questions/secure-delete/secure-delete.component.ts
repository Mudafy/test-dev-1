import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { Question } from 'src/app/models/question';
import { QuestionsService } from '../../../services/data/questions.service';

@Component({
  selector: 'app-secure-delete',
  templateUrl: './secure-delete.component.html',
  styleUrls: ['./secure-delete.component.scss']
})
export class SecureDeleteComponent{

  constructor(private questionService: QuestionsService,
              public dialogRef: MatDialogRef<SecureDeleteComponent>,
              @Inject(MAT_DIALOG_DATA) public question: Question) {}

  onNoClick(): void {
    this.dialogRef.close();
  }
  deleteQuestion(): void {
    this.questionService.remove(this.question);
    this.dialogRef.close();
  }

}
