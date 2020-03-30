import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { QuestionDetailComponent } from './questions/question-detail/question-detail.component';
import { QuestionListComponent } from './questions/question-list/question-list.component';
import { ComponentsModule } from '../components/components.module';
import { MakeComponent } from './questions/make/make.component';

@NgModule({
  declarations: [
    QuestionListComponent,
    QuestionDetailComponent,
    MakeComponent,
  ],
  imports: [
    CommonModule,
    ComponentsModule
  ]
})
export class ViewsModule { }
