import { Component, OnInit, ViewChild } from '@angular/core';
import { Question } from 'src/app/services/question';
import { QuestionsService } from 'src/app/services/questions.service';
import { MatPaginator, MatTableDataSource, MatSort } from '@angular/material';
import { questions } from 'src/app/services/questions';

@Component({
  selector: 'app-question-list',
  templateUrl: './question-list.component.html',
  styleUrls: ['./question-list.component.scss']
})
export class QuestionListComponent implements OnInit {

  questions: Array<Question>;
  dataSource: MatTableDataSource<Question>;

  constructor(private questionsSvc: QuestionsService) {
    questionsSvc.questions$.subscribe(q => {
      this.questions = q;
    });
  }

  displayedColumns: string[] = ['id', 'name', 'id-actions'];

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  
  ngOnInit() {
    this.dataSource = new MatTableDataSource<Question>(questions);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }


  getQuestionId(index: number, item: Question): number {
    return item.id;
  }

  onSelectQuestion(question: Question){
    this.questionsSvc.selectedQuestion.emit(question);
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}
