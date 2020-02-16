import { Component, OnInit, Inject } from '@angular/core';
import { QuestionsService } from 'src/app/services/questions.service';
import { Question } from 'src/app/models/question';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { BrokersService } from 'src/app/services/brokers.service';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { QuestionStub } from 'src/app/models/question-stub';
import { NotificationsService } from 'src/app/services/notifications.service';

@Component({
  selector: 'app-question-new-edit-dialog',
  templateUrl: './question-new-edit-dialog.component.html',
  styleUrls: ['./question-new-edit-dialog.component.scss']
})
export class QuestionNewEditDialogComponent implements OnInit {

  form: FormGroup = new FormGroup({
    $id: new FormControl(null),
    name: new FormControl('', Validators.required),
    phone: new FormControl(''),
    email: new FormControl('', [Validators.required, Validators.email]),
    message: new FormControl(''),
    broker: new FormControl(null)
  });

  public editMode: boolean;

  // initializeFormGroup() {
  //   this.form.setValue({
  //     $id: null,
  //     name: '',
  //     phone: null,
  //     email: '',
  //     message: null,
  //     broker: 0
  //   });
  // }

  populateForm(question: Question) {
    this.form.setValue({
      $id: question.id,
      name: question.name,
      phone: question.phone,
      email: question.email,
      message: question.message,
      broker: question.broker
    });
  }

  mapFormToQuestionStub(): QuestionStub {
    return {
      name: this.form.value.name,
      phone: this.form.value.phone,
      message: this.form.value.message,
      email: this.form.value.email
    };
  }

  constructor(
    public questionsSvc: QuestionsService,
    public brokersSvc: BrokersService,
    public notificationsSvc: NotificationsService,
    public dialogRef: MatDialogRef<QuestionNewEditDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public question: Question) {
    this.editMode = false;
    if (question) {
      this.populateForm(question);
      this.editMode = true;
    }
  }

  ngOnInit() {
  }

  close(): void {
    this.dialogRef.close();
  }

  onSubmit() {
    if (this.form.valid) {
      if (!this.form.get('$id').value) {
        this.questionsSvc.add(
          this.mapFormToQuestionStub(),
          parseInt(this.form.value.broker, 10));
        this.notificationsSvc.success('La consulta ha sido creada exitosamente.');
      } else {
        this.questionsSvc.edit(
          this.question,
          this.mapFormToQuestionStub());
        this.notificationsSvc.success('La consulta ha sido modificada exitosamente.');
      }
      this.close();
    }
  }
}
