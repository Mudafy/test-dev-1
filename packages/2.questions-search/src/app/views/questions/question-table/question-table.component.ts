import {Component, OnInit, ViewChild} from '@angular/core';
import { Question } from 'src/app/services/question';
import { QuestionsService } from 'src/app/services/questions.service';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';

const data: Array<Question> = [
  {name:'Test', email:'test@test.com'}
]

@Component({
  selector: 'question-table',
  styleUrls: ['question-table.component.scss'],
  templateUrl: 'question-table.component.html',
})

export class QuestionTableComponent implements OnInit{
  
  displayedColumns: string[] = ['id', 'name', 'email', 'phone', 'question', 'actions'];
  questions: Array<Question>
  selectedQuestion: Question
  dataSource = new MatTableDataSource<Question>(data);

  @ViewChild(MatPaginator) paginator: MatPaginator;
  constructor(private questionsSvc: QuestionsService) {
    this.refresh()
  }
  refresh() {
    this.questionsSvc.questions$.subscribe(q => {
      this.questions = q;
    });
    this.dataSource = new MatTableDataSource<Question>(this.questions);
  }
  ngOnInit() {
    this.dataSource.paginator = this.paginator;
  }
  
  public borrar(element){
    this.questionsSvc.getById(parseInt(element)).subscribe(q => {
      this.selectedQuestion = q;
    })
    this.questionsSvc.remove(this.selectedQuestion);
    this.refresh();
    this.dataSource.paginator = this.paginator;
  }

  applyFilter(event: Event){
    const value = (event.target as HTMLInputElement).value;
    this.dataSource.filter = value.trim().toLowerCase();
  }
}