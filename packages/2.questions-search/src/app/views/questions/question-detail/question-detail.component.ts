import { Component, OnInit } from '@angular/core';
import { Question } from 'src/app/services/question';
import { QuestionsService } from 'src/app/services/questions.service';
import { QuestionStub } from 'src/app/services/question-stub';

@Component({
  selector: 'app-question-detail',
  templateUrl: './question-detail.component.html',
  styleUrls: ['./question-detail.component.scss']
})
export class QuestionDetailComponent implements OnInit {

  selectedQuestion: Question;
  currentAction: string;
  editedQuestion: QuestionStub;
  newBroker: number;

  constructor(private questionService: QuestionsService) { }

  ngOnInit() {
    this.cleanQuestionStub();

    this.questionService.selectedQuestion$.subscribe( 
      (q: Question)=>{
        this.selectedQuestion = q;
        if(q){
          this.editedQuestion.email = q.email;
          this.editedQuestion.message = q.message;
          this.editedQuestion.phone = q.phone;
          this.editedQuestion.name = q.name;
        }
      }
    )

    this.questionService.currentAction$.subscribe( 
      (a: string)=>{
        this.currentAction = a;
        if(this.currentAction =='create'){
          this.newBroker = null;
          this.cleanQuestionStub();
        }
      }
    )
  }

  cleanQuestionStub(){
    this.editedQuestion = <QuestionStub> {
      name: "",
      email: "",
      phone: "",
      message: ""
    }
  }

  saveChanges(){
    if(this.editedQuestion.email.length < 1 || this.editedQuestion.name.length < 1 ) return false;

    if(this.currentAction == 'edit'){
      this.questionService.edit(this.selectedQuestion, this.editedQuestion)
      .subscribe(r => {
        console.info(`Edited question ${this.selectedQuestion.id} with status ${r}`);
      });
    }else{
      this.questionService.add(this.editedQuestion, this.newBroker)
    }
    this.cancel();
  }

  cancel(){
    this.questionService.updateCurrentAction('view');
  }

  

}
