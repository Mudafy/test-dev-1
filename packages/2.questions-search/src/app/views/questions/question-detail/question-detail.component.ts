import { Component, OnInit } from '@angular/core';
import { Question } from 'src/app/services/question';
import { Router, ActivatedRoute } from '@angular/router';
import { QuestionsService } from 'src/app/services/questions.service';

@Component({
  selector: 'app-question-detail',
  templateUrl: './question-detail.component.html',
  styleUrls: ['./question-detail.component.scss']
})
export class QuestionDetailComponent implements OnInit {

  question: Question;
  id: number;
  notFound: boolean;
  loading: boolean;

  constructor(private questionsService: QuestionsService, private router: Router,
              private activeRoute: ActivatedRoute) {}

  ngOnInit() {
    this.id = parseInt(this.activeRoute.snapshot.paramMap.get('id'));
    this.questionsService.getById(this.id).subscribe(
      data => {
        this.loading = false;
        if (data) {
          this.question = data;
        }
        else {
          this.notFound = true;
        }
      },
      error => this.notFound = true,
    );
  }

}
