import {Component, OnInit, ViewChild} from '@angular/core';
import { Question } from 'src/app/services/question';
import { QuestionsService } from 'src/app/services/questions.service';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import {MatSort} from '@angular/material/sort';
import { FirestoreService } from 'src/app/services/firestore/firestore.service';
import {MatSnackBar} from '@angular/material/snack-bar';
import { QuestionStub } from 'src/app/services/question-stub';


@Component({
  selector: 'question-table',
  styleUrls: ['question-table.component.scss'],
  templateUrl: 'question-table.component.html',
})
export class QuestionTableComponent implements OnInit{
  
  displayedColumns: string[] = ['id', 'name', 'email', 'phone', 'question', 'actions'];
  public questions = [];

  sortedQuestions: Array<Question>
  selectedQuestion: Question
  dataSource = new MatTableDataSource<Question>();
  public lastId:number = 1;

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  constructor(private questionsSvc: FirestoreService, private _snackBar: MatSnackBar) {    
    //this.refresh();
    //this.sortedQuestions = this.questions.slice();
  }

  // This was used with mocked data
  // public refresh() {
  //   this.questionsSvc.questions$.subscribe(q => {
  //     this.questions = q;
  //   });
  //   this.dataSource = new MatTableDataSource<Question>(this.questions);
  // }

  public reloadPaginator(){
    this.dataSource.paginator = this.paginator;
  }
  ngOnInit() {
    
    this.questionsSvc.getQuestions().subscribe((questionsSnapshot) => {
      this.questions = [];
      questionsSnapshot.forEach((questionData: any) => {
        this.questions.push({
          key: questionData.payload.doc.id,
          ...questionData.payload.doc.data()
        });
        this.lastId = this.questions.reduce(function(prev, current) {
          return (prev.id > current.id) ? prev : current
        }).id
        this.dataSource = new MatTableDataSource<Question>(this.questions);
        this.sortedQuestions = this.questions.slice();
        this.dataSource.sort = this.sort;
        this.reloadPaginator();
      })
    });
  }
  
  getLastId(){
    return this.lastId
  }

  deleteQuestion(questionKey){
    this.questionsSvc.deleteQuestion(questionKey)
    this.openSnackBar()
  }

  // This was used with mocked data
  // public borrar(element){
  //   this.questionsSvc.getById(parseInt(element)).subscribe(q => {
  //     this.selectedQuestion = q;
  //   })
  //   this.questionsSvc.remove(this.selectedQuestion);
  //   this.refresh();
  //   this.reloadPaginator();
  // }

  applyFilter(event: Event){
    const value = (event.target as HTMLInputElement).value;
    this.dataSource.filter = value.trim().toLowerCase();
  }
  openSnackBar(){
    this._snackBar.open("Se borró consulta del listado","", {
      duration: 2000,
    });

  }
}