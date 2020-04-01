// Modules
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ComponentsModule } from '../components/components.module';
import { MaterialModule } from '../material/material.module';
import { RouterModule } from '@angular/router';
// Components
import { MakeComponent } from './questions/make/make.component';
import { QuestionDetailComponent } from './questions/question-detail/question-detail.component';
import { QuestionListComponent } from './questions/question-list/question-list.component';
import { SecureDeleteComponent } from '../components/secure-delete/secure-delete.component';


@NgModule({
  declarations: [
    QuestionListComponent,
    QuestionDetailComponent,
    MakeComponent,
  ],
  entryComponents: [QuestionListComponent, SecureDeleteComponent],
  imports: [
    CommonModule,
    RouterModule,
    ComponentsModule,
    MaterialModule
  ]
})
export class ViewsModule { }
