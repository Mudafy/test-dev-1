import {Component, OnInit, Output, EventEmitter, Input} from '@angular/core';
import { QuestionStub } from 'src/app/services/question-stub';
import { QuestionsService } from 'src/app/services/questions.service';
import {MatSnackBar} from '@angular/material/snack-bar';
import {NgForm} from '@angular/forms';
import { FirestoreService } from 'src/app/services/firestore/firestore.service';

@Component({
  selector: 'question-form',
  styleUrls: ['question-form.component.scss'],
  templateUrl: 'question-form.component.html',
})

export class QuestionFormComponent implements OnInit{
  addQuestion = {} as QuestionStub
  @Input() table;
  
  constructor(private questionSrv: QuestionsService, private fireService: FirestoreService,private _snackBar: MatSnackBar) { 
  }
  
  ngOnInit() {
  
  }

  // emitAddQuestion(questionForm: NgForm){
    
  //   this.addQuestion.email = questionForm.value.email
  //   this.addQuestion.phone = questionForm.value.phone
  //   this.addQuestion.name = questionForm.value.name
  //   this.addQuestion.message = questionForm.value.message
  //   this.questionSrv.add(this.addQuestion,999)
  //   this.table.refresh();
  //   this.table.reloadPaginator();
  //   this.openSnackBar()
  // }

  onAddQuestion(questionForm: NgForm){
    this.fireService.addQuestion(questionForm.value, this.table.getLastId())
    this.openSnackBar()
    this.onResetForm(questionForm)
  }

  onResetForm(questionForm: NgForm){
    questionForm.resetForm();
  }

  openSnackBar(){
    this._snackBar.open("Consulta agregada","", {
      duration: 2000,
    });

  }
  
}