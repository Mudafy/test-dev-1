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
    broker: new FormControl(0)
  })

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
    @Inject(MAT_DIALOG_DATA) public question: Question) { }

  ngOnInit() {
  }

  close(): void {
    this.dialogRef.close();
  }

  onSubmit() {
    if (this.form.valid) {
      this.questionsSvc.add(
        this.mapFormToQuestionStub(),
        this.form.value.broker);
      this.notificationsSvc.success("¡La consulta ha sido creada exitosamente!");
      this.close();
    }
  }
}
