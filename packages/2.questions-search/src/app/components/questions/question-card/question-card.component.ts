import { Component, Input, OnInit } from '@angular/core';
import { Question } from 'src/app/models/question';
import { BrokersService } from 'src/app/services/brokers.service';

@Component({
  selector: 'app-question-card',
  templateUrl: './question-card.component.html',
  styleUrls: ['./question-card.component.scss']
})
export class QuestionCardComponent implements OnInit {

  @Input() question: Question;
  public brokerName: string;

  constructor(public brokersSvc: BrokersService) { }

  ngOnInit() {
    if (this.question) {
      this.brokersSvc.getById(this.question.broker).subscribe(
        b => { if (b) { this.brokerName = b.name; } }
      );
    }
  }

}
