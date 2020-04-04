import { Component, OnInit, ViewChild } from '@angular/core';
// Models
import { Question } from 'src/app/models/question';
import { QuestionsService } from 'src/app/services/data/questions.service';
//table
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';


//Delete
import {MatDialog} from '@angular/material/dialog';
import { SecureDeleteComponent } from '../secure-delete/secure-delete.component';


@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnInit {

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
