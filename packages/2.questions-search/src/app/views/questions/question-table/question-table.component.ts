import {Component, OnInit, ViewChild} from '@angular/core';
import { Question } from 'src/app/services/question';
import { QuestionsService } from 'src/app/services/questions.service';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import {MatSort} from '@angular/material/sort';


@Component({
  selector: 'question-table',
  styleUrls: ['question-table.component.scss'],
  templateUrl: 'question-table.component.html',
})
export class QuestionTableComponent implements OnInit{
  
  displayedColumns: string[] = ['id', 'name', 'email', 'phone', 'question', 'actions'];
  questions: Array<Question>
  sortedQuestions: Array<Question>
  selectedQuestion: Question
  dataSource = new MatTableDataSource<Question>();
  

  public myCount: number = 0

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  constructor(private questionsSvc: QuestionsService) {
    this.refresh();
    this.sortedQuestions = this.questions.slice();
  }

  
  public refresh() {
    this.questionsSvc.questions$.subscribe(q => {
      this.questions = q;
    });
    this.dataSource = new MatTableDataSource<Question>(this.questions);
  }

  public reloadPaginator(){
    this.dataSource.paginator = this.paginator;
  }
  ngOnInit() {
    this.reloadPaginator();
    this.dataSource.sort = this.sort;
  }
  
  public borrar(element){
    this.questionsSvc.getById(parseInt(element)).subscribe(q => {
      this.selectedQuestion = q;
    })
    this.questionsSvc.remove(this.selectedQuestion);
    this.refresh();
    this.reloadPaginator();
  }

  applyFilter(event: Event){
    const value = (event.target as HTMLInputElement).value;
    this.dataSource.filter = value.trim().toLowerCase();
  }
}

function compare(a: number | string, b: number | string, isAsc: boolean) {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}