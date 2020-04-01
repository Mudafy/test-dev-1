import { Component, OnInit, ViewChild, Inject } from '@angular/core';
// Models
import { Question } from 'src/app/models/question';
import { QuestionsService } from 'src/app/services/data/questions.service';
//table
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';


//Delete
import {MatDialog} from '@angular/material/dialog';
import { SecureDeleteComponent } from '../../../components/secure-delete/secure-delete.component';


@Component({
  selector: 'app-question-list',
  templateUrl: './question-list.component.html',
  styleUrls: ['./question-list.component.scss']
})
export class QuestionListComponent implements OnInit {

  questions: Array<Question>;
  displayedColumns;
  dataSource;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  constructor(questionsSvc: QuestionsService, public dialog: MatDialog) {
    questionsSvc.questions$.subscribe(q => {
      this.questions = q;
      this.displayedColumns = ['position', 'delete', 'name', 'phone', 'email', 'broker', 'message'];
      this.dataSource = new MatTableDataSource<Question>(this.questions);
      this.dataSource.paginator = this.paginator;
    });
  }

  ngOnInit() {
    this.dataSource.paginator = this.paginator;
  }

  openSecureDelete(question): void {
      const dialogRef = this.dialog.open(SecureDeleteComponent, {
        width: '300px',
        data: question
      });
      dialogRef.afterClosed().subscribe(result => {
        console.log('The dialog was closed');
        // this.animal = result;
      });
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }


  getQuestionId(index: number, item: Question): number {
    return item.id;
  }
}
