import { Component, Input, OnInit, OnChanges } from '@angular/core';
import { Question } from '../../../../app/models/question';
import { BrokersService } from '../../../../app/services/brokers.service';

@Component({
  selector: 'app-question-card',
  templateUrl: './question-card.component.html',
  styleUrls: ['./question-card.component.scss']
})
export class QuestionCardComponent implements OnChanges {

  @Input() question: Question;
  public brokerName: string;

  constructor(public brokersSvc: BrokersService) {
  }

  ngOnChanges() {
    if (this.question) {
      this.brokersSvc.getById(this.question.broker).subscribe(
        b => { if (b) { this.brokerName = b.name; } }
      );
    }
  }

}
