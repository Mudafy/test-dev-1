import { Component, OnInit, Input } from '@angular/core';
import { Question } from 'src/app/services/question';
import { QuestionsService } from 'src/app/services/questions.service';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-question-detail',
  templateUrl: './question-detail.component.html',
  styleUrls: ['./question-detail.component.scss']
})
export class QuestionDetailComponent implements OnInit {

  public questionId = "";
  public question: Question;

  @Input() name : string;
  @Input() phone : string;
  @Input() email : string;
  @Input() message : string;


  constructor(activatedRoute: ActivatedRoute, private questionsSvc: QuestionsService) {
    console.log(questionsSvc);
    this.questionId = activatedRoute.snapshot.params['id'];
  }

  ngOnInit() {

    // this.questionsSvc.getById(this.questionId).suscribe(data => {
    //   console.log("gola");

    //   this.question = data;
    // },
    //   error => { });

  }


}
