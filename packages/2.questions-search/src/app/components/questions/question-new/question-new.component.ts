import { Component, OnInit } from '@angular/core';
import { QuestionsService } from 'src/app/services/questions.service';

@Component({
  selector: 'app-question-new',
  templateUrl: './question-new.component.html',
  styleUrls: ['./question-new.component.scss']
})
export class QuestionNewComponent implements OnInit {

  constructor(private questionsSvc: QuestionsService) { }

  ngOnInit() {
  }

}
