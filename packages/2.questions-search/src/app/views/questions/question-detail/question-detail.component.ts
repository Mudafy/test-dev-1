import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Question } from 'src/app/services/question';
import { QuestionsService } from 'src/app/services/questions.service';
import { FirestoreService } from 'src/app/services/firestore/firestore.service';

@Component({
  selector: 'app-question-detail',
  templateUrl: './question-detail.component.html',
  styleUrls: ['./question-detail.component.scss']
})

export class QuestionDetailComponent implements OnInit {
  
  questions: Array<Question>
  ARGS: Question[]
  public id: string;
  
  questionDetail: Question;
  constructor(private route: ActivatedRoute, private questionsSvc: FirestoreService) {
    // this.questionsSvc.questions$.subscribe(q => {
    //   this.questions = q;
    // });

  }
  
  ngOnInit() {
    const questionsData = this.questionsSvc.getQuestion(this.route.snapshot.paramMap.get('id'));
    questionsData.subscribe(q => {
      this.questionDetail = q.payload.data() as Question
    })
    // this.questionsSvc.getById(parseInt(this.route.snapshot.paramMap.get('id'))).subscribe(q => {
    //   this.questionDetail = q
    // })
  }

}
