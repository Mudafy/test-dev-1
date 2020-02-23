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
  displayedColumns: string[] = ['id', 'name', 'id-details', 'id-edit', 'id-delete'];

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

  onSelectQuestion(action:string, question?: Question){
    this.questionsSvc.updateCurrentAction(action);

    if(action != 'create'){
      this.questionsSvc.updateSelectedQuestionById(question.id);
    }
  }

  onDeleteQuestion(question: Question){
    this.questionsSvc.remove(question).subscribe(
      r => {
        console.log(`Deleted question ${question.id} with status: ${r}`);

        const selectedQuestion = this.questionsSvc.selectedQuestion$.value;

        if(selectedQuestion && question.id == selectedQuestion.id){
          this.questionsSvc.updateSelectedQuestionById(null);
        }
    });
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}
