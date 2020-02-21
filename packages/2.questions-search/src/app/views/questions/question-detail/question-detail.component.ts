import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { QuestionsService } from '../../../../app/services/questions.service';
import { Question } from '../../../../app/models/question';


@Component({
  selector: 'app-question-detail',
  templateUrl: './question-detail.component.html',
  styleUrls: ['./question-detail.component.scss']
})
export class QuestionDetailComponent implements OnInit {

  public question: Question;
  constructor(private route: ActivatedRoute, private questionsSvc: QuestionsService) { }

  ngOnInit() {
    const id = String(this.route.snapshot.paramMap.get('id'));
    this.questionsSvc.getById(id).subscribe(q => this.question = q);
  }

}
