// Modules
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ComponentsModule } from '../components/components.module';
import { MaterialModule } from '../material/material.module';
import { RouterModule } from '@angular/router';
import { PipesModule } from '../pipes/pipes.module';
import { SharedModule } from '../shared/shared.module';
// Components
import { QuestionModifyComponent } from './questions/question-modify/question-modify.component';
import { QuestionMakeComponent } from './questions/question-make/question-make.component';
import { QuestionDetailComponent } from './questions/question-detail/question-detail.component';
import { QuestionListComponent } from './questions/question-list/question-list.component';
import { QuestionItemComponent } from '../shared/sidebar/question-item/question-item.component';
import { SecureDeleteComponent } from '../components/questions/secure-delete/secure-delete.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    QuestionListComponent,
    QuestionDetailComponent,
    QuestionMakeComponent,
    QuestionModifyComponent,
  ],
  entryComponents: [QuestionListComponent, SecureDeleteComponent, QuestionItemComponent],
  imports: [
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    CommonModule,
    RouterModule,
    ComponentsModule,
    MaterialModule,
    PipesModule
  ]
})
export class ViewsModule { }
