import { Component, Input, OnInit } from '@angular/core';
import { Question } from 'src/app/services/question';
import { QuestionsService } from 'src/app/services/questions.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-question-card',
  templateUrl: './question-card.component.html',
  styleUrls: ['./question-card.component.scss']
})
export class QuestionCardComponent implements OnInit {

  @Input() question: Question;
  executing: boolean;

  constructor(private questionsService: QuestionsService,  private router: Router) { }

  ngOnInit() {
  }

  deleteQuestion(): void {
    if (!this.executing) {
      this.executing = true;
      this.questionsService.remove(this.question).subscribe(data => {
        this.executing = false;
        this.router.navigate(['/', 'questions']);
      },
      error => console.error(error));
    }
  }

  editQuestion(): void {
    this.router.navigate(['/', 'questions', this.question.id, 'edit']);
  }
}
