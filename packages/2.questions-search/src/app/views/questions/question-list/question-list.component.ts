import { Component, OnInit, ViewChild } from '@angular/core';
import { Question } from 'src/app/services/question';
import { QuestionsService } from 'src/app/services/questions.service';
import { MatTableDataSource, MatPaginator, MatSort } from '@angular/material';

@Component({
  selector: 'app-question-list',
  templateUrl: './question-list.component.html',
  styleUrls: ['./question-list.component.scss']
})
export class QuestionListComponent implements OnInit {

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  displayedColumns: string[] = ['name', 'phone', 'email', 'broker', 'actions'];
  dataSource: MatTableDataSource<Question>;
  constructor(private questionsSvc: QuestionsService) {
    questionsSvc.questions$.subscribe(q => {
      this.dataSource = new MatTableDataSource(q);
      this.refreshTable();
    });
  }

  ngOnInit() {
    this.refreshTable();
  }

  refreshTable(){
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  getQuestionId(index: number, item: Question): number {
    return item.id;
  }

  deleteQuestion(item: Question) {
    return this.questionsSvc.remove(item);
  }
}
