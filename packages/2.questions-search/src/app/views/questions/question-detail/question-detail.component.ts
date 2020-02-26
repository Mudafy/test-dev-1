import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Question } from 'src/app/services/question';
import { QuestionsService } from 'src/app/services/questions.service';


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
  constructor(private route: ActivatedRoute, private questionsSvc: QuestionsService) {
    this.questionsSvc.questions$.subscribe(q => {
      this.questions = q;
    });

  }
  
  ngOnInit() {
    this.questionsSvc.getById(parseInt(this.route.snapshot.paramMap.get('id'))).subscribe(q => {
      this.questionDetail = q
      console.log(q)
    })
  }
  public saludar(){
    this.questionsSvc.remove(this.questionDetail)
  }
}
