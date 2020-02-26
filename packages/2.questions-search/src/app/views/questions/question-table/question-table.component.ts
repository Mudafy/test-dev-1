import {Component, OnInit, ViewChild} from '@angular/core';
import { Question } from 'src/app/services/question';
import { QuestionsService } from 'src/app/services/questions.service';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';

@Component({
  selector: 'question-table',
  styleUrls: ['question-table.component.scss'],
  templateUrl: 'question-table.component.html',
})

export class QuestionTableComponent implements OnInit{
  
  displayedColumns: string[] = ['id', 'name', 'email', 'phone', 'question', 'actions'];
  questions: Array<Question>
  selectedQuestion: Question
  dataSource = new MatTableDataSource<Question>();

  @ViewChild(MatPaginator) paginator: MatPaginator;
  constructor(private questionsSvc: QuestionsService) {
    this.questionsSvc.questions$.subscribe(q => {
        this.questions = q;
    });
    this.dataSource = new MatTableDataSource<Question>(this.questions);
  }

  ngOnInit() {
    this.dataSource.paginator = this.paginator;
  }
}
