import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { QuestionsService } from 'src/app/services/questions.service';
import { QuestionStub } from 'src/app/services/question-stub';
import { Router, ActivatedRoute } from '@angular/router';
import { CustomErrorStateMatcher } from '../custom-error-matcher';
import { numberValidator } from '../validators/number-validator';
import { Question } from 'src/app/services/question';

@Component({
  selector: 'app-edit-question',
  templateUrl: './edit-question.component.html',
  styleUrls: ['./edit-question.component.scss']
})
export class EditQuestionComponent implements OnInit {

  question: Question = undefined;
  idFormControl: FormControl;
  nameFormControl = new FormControl('', [
    Validators.required,
  ]);
  phoneFormControl = new FormControl('', []);
  emailFormControl = new FormControl('', [
    Validators.required,
    Validators.email,
  ]);
  questionFormControl = new FormControl('', [
    Validators.required,
  ]);
  brokerFormControl: FormControl;
  matcher = new CustomErrorStateMatcher();
  notFound: boolean;
  id: number;
  loading: boolean;
  executing: boolean;

  constructor(private questionsService: QuestionsService, private router: Router,
              private activeRoute: ActivatedRoute) {}

  ngOnInit() {
    this.loading = true;
    this.id = parseInt(this.activeRoute.snapshot.paramMap.get('id'));
    this.questionsService.getById(this.id).subscribe(
      data => {
        if (data) {
          this.question = data;
          this.idFormControl = new FormControl({ value: `${this.question.id}`, disabled: true }, []);
          this.nameFormControl.setValue(`${this.question.name}`);
          this.phoneFormControl.setValue(`${this.question.phone}`);
          this.emailFormControl.setValue(`${this.question.email}`);
          this.questionFormControl.setValue(`${this.question.message}`);
          this.brokerFormControl = new FormControl({ value: `${this.question.broker}`, disabled: true }, []);
          this.loading = false;
        }
        else {
          this.notFound = true;
        }
      },
      error => this.notFound = true,
    );
  }

  isValidForm(): boolean {
    if (this.emailFormControl.valid && this.nameFormControl.valid) {
      return true;
    }
    return false;
  }

  onSubmit() {
    if (this.isValidForm()) {
      this.executing = true;
      const newQuestion: QuestionStub = {
        name: this.nameFormControl.value,
        phone: this.phoneFormControl.value ? this.phoneFormControl.value : undefined,
        email: this.emailFormControl.value,
        message: this.questionFormControl.value,
      };
      this.questionsService.edit(this.question, newQuestion).subscribe(
        data => {
          this.executing = false;
          this.router.navigate(['/', 'questions', this.question.id]);
        },
        error => console.error(error)
      );
    }
  }
}