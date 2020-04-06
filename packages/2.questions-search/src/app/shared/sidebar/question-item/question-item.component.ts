import { Component, OnInit, Input } from '@angular/core';
import { Question } from 'src/app/models/question';
//Delete
import {MatDialog} from '@angular/material/dialog';
import { SecureDeleteComponent } from '../../../components/questions/secure-delete/secure-delete.component';

@Component({
  selector: 'app-question-item',
  templateUrl: './question-item.component.html',
  styleUrls: ['./question-item.component.scss']
})
export class QuestionItemComponent implements OnInit {
  @Input('question') question:Question;
  constructor( public dialog: MatDialog) {
  }

  openSecureDelete(question): void {
    const dialogRef = this.dialog.open(SecureDeleteComponent, {
      width: '300px',
      data: question
    });
    dialogRef.afterClosed().subscribe(result => {
      // this.animal = result;
    });
}
  ngOnInit() {
  }

}
