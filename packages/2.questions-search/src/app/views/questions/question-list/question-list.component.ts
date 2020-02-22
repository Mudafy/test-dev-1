import { Component, OnInit, ViewChild } from '@angular/core';
import { Question } from 'src/app/services/question';
import { QuestionsService } from 'src/app/services/questions.service';
import { MatPaginator, MatTableDataSource, MatSort } from '@angular/material';

@Component({
  selector: 'app-question-list',
  templateUrl: './question-list.component.html',
  styleUrls: ['./question-list.component.scss']
})
export class QuestionListComponent implements OnInit {

  dataSource = new MatTableDataSource<Question>();
  displayedColumns: string[] = ['id', 'name', 'id-actions'];

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  
  constructor(private questionsSvc: QuestionsService) {}

  ngOnInit() {
    this.questionsSvc.questions$.subscribe(q => {
      this.dataSource.data = q;
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }


  getQuestionId(index: number, item: Question): number {
    return item.id;
  }

  onSelectQuestion(question: Question, action:string){
    this.questionsSvc.selectedQuestion$.emit(question);
    this.questionsSvc.currentAction$.emit(action);
  }

  onDeleteQuestion(question: Question){
    this.questionsSvc.remove(question).subscribe(
      r => console.log(`Deleted question ${question.id} with status: ${r}`)
    );
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}
