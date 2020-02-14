import { Component, OnInit, ViewChild } from '@angular/core';
import { Question } from 'src/app/services/question';
import { QuestionsService } from 'src/app/services/questions.service';
import { MatTableDataSource, MatPaginator } from '@angular/material';

@Component({
  selector: 'app-question-list',
  templateUrl: './question-list.component.html',
  styleUrls: ['./question-list.component.scss']
})
export class QuestionListComponent implements OnInit {

  @ViewChild(MatPaginator) paginator: MatPaginator;

  displayedColumns: string[] = ['name', 'phone', 'email', 'broker', 'actions'];
  dataSource: MatTableDataSource<Question>;
  constructor(questionsSvc: QuestionsService) {
    questionsSvc.questions$.subscribe(q => {
      this.dataSource = new MatTableDataSource(q);
    });
  }

  ngOnInit() {
    this.dataSource.paginator = this.paginator;
  }


  getQuestionId(index: number, item: Question): number {
    return item.id;
  }
}
