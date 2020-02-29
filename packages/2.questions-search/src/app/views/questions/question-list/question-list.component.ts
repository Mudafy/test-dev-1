import { Component, OnInit, ViewChild } from '@angular/core';
import { Question } from 'src/app/services/question';
import { QuestionsService } from 'src/app/services/questions.service';
import { MatSort, MatTableDataSource } from '@angular/material';
import { questions } from 'src/app/services/questions';

@Component({
  selector: 'app-question-list',
  templateUrl: './question-list.component.html',
  styleUrls: ['./question-list.component.scss']
})
export class QuestionListComponent implements OnInit {
  columnsTitles: string[] = ['id', 'name', 'email'];
  questions: Array<Question>;
  dataSource = new MatTableDataSource(questions);
  @ViewChild(MatSort) sort: MatSort
  
  constructor(questionsSvc: QuestionsService) {
    questionsSvc.questions$.subscribe(q => {
      this.questions = q;
    });
  }

  ngOnInit() {
    this.dataSource.sort = this.sort;

  }


  getQuestionId(index: number, item: Question): number {
    return item.id;
  }
}
