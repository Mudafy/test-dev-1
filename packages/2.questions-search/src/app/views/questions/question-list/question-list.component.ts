import { Component, OnInit, ViewChild} from '@angular/core';
import { Question } from 'src/app/services/question';
import { QuestionsService } from 'src/app/services/questions.service';
import { MatDialog } from '@angular/material/dialog';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import { CreateQuestionDialogComponent } from 'src/app/components/create question dialog/create-question-dialog.component';

@Component({
  selector: 'app-question-list',
  templateUrl: './question-list.component.html',
  styleUrls: ['./question-list.component.scss']
})
export class QuestionListComponent implements OnInit {

  //Used by the mat-table element
  displayedColumns: string[] = ['id', 'name', 'email', 'delete'];
  tableDataSource: MatTableDataSource<Question>;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private questionsSvc: QuestionsService, private createQuestionDialog: MatDialog) {
    questionsSvc.questions$.subscribe(q => {
      this.tableDataSource = new MatTableDataSource(q);
    });
  }
  
  ngOnInit() {
    this.tableDataSource.sort = this.sort;
  }

  openCreateQuestionDialog(): void {
    const dialogRef = this.createQuestionDialog.open(CreateQuestionDialogComponent, {
      width: '40%'
    });
  }

  getQuestionId(index: number, item: Question): number {
    return item.id;
  }

  deleteQuestion(question: Question){
    this.questionsSvc.remove(question);
    this.tableDataSource.sort = this.sort;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.tableDataSource.filter = filterValue.trim().toLowerCase();
  }
}