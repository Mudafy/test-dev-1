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

  constructor(private questionService: QuestionsService) { }

  ngOnInit() {
    this.cleanQuestionStub();

    this.questionService.selectedQuestion$.subscribe( 
      (q: Question)=>{
        this.selectedQuestion = q;
        this.editedQuestion.email = q.email;
        this.editedQuestion.message = q.message;
        this.editedQuestion.phone = q.phone;
        this.editedQuestion.name = q.name;
      }
    )

    this.questionService.currentAction$.subscribe( 
      (a: string)=>{
        this.currentAction = a;
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
    this.questionService.edit(this.selectedQuestion, this.editedQuestion)
    .subscribe(r => {
      console.info(`Edited question ${this.selectedQuestion.id} with status ${r}`);
    });
  }

  cancel(){
    this.questionService.currentAction$.emit('view');
  }

  

}
