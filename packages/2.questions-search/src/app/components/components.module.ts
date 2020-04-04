// Modules
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
// Components
import { MaterialModule } from '../material/material.module';
import { QuestionCardComponent } from './questions/question-card/question-card.component';
import { QuestionMakerComponent } from './questions/question-maker/question-maker.component';
import { SecureDeleteComponent } from './questions/secure-delete/secure-delete.component';
import { TableComponent } from './questions/table/table.component';
@NgModule({
  declarations: [
    QuestionCardComponent,
    QuestionMakerComponent,
    SecureDeleteComponent,
    TableComponent
  ],
  imports: [
    ReactiveFormsModule,
    CommonModule,
    MaterialModule,
    RouterModule,
    FormsModule
  ],
  exports: [
    QuestionCardComponent,
    QuestionMakerComponent,
    SecureDeleteComponent,
    TableComponent
  ]
})
export class ComponentsModule { }
