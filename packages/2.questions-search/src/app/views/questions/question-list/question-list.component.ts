import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from "@angular/router";
import { Question } from 'src/app/services/question';
import { QuestionsService } from 'src/app/services/questions.service';
import { MatSort, MatTableDataSource, MatPaginator } from '@angular/material';

@Component({
  selector: 'app-question-list',
  templateUrl: './question-list.component.html',
  styleUrls: ['./question-list.component.scss']
})
export class QuestionListComponent implements OnInit {
  columnsTitles: string[] = ['id', 'name', 'email', 'broker', 'actions'];
  questions: Array<Question> = [];
  dataSource = new MatTableDataSource(this.questions);
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  
  constructor(private questionsService: QuestionsService, private router: Router) {
    questionsService.questions$.subscribe(q => {
      this.questions = q;
      this.updateDataSource();
    });
  }

  updateDataSource() {
    this.dataSource = new MatTableDataSource(this.questions);
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  ngOnInit() {
    this.dataSource.sort = this.sort;
    this.paginator._intl.itemsPerPageLabel = 'Cantidad de filas';
    this.dataSource.paginator = this.paginator;
  }

  getQuestionId(index: number, item: Question): number {
    return item.id;
  }

  deleteQuestion(event: Event, questionToDelete: Question): void {
    event.stopPropagation();
    this.questionsService.remove(questionToDelete).subscribe(data => {
      this.questions = this.questions.filter(question => question.id !== questionToDelete.id);
      this.dataSource = new MatTableDataSource(this.questions);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
    },
    error => console.error(error));
  }

  editQuestion(event: Event, questionToEdit: Question): void {
    event.stopPropagation();
    console.log("editing question with id: ", questionToEdit.id);
  }

  showDetail(question: Question): void {
    this.router.navigate(['/', 'questions', question.id]);
    console.log("show detail: ", question.id);
  }

  applyFilter(filter: string) {
    this.dataSource.filter = filter.trim().toLocaleLowerCase();
  }
}
