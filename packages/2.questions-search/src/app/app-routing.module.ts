import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NotFoundComponent } from './views/questions/not-found/not-found.component';
import { QuestionDetailComponent } from './views/questions/question-detail/question-detail.component';
import { QuestionListComponent } from './views/questions/question-list/question-list.component';
import { CreateQuestionComponent } from './forms/create-question/create-question.component';
import { EditQuestionComponent } from './forms/edit-question/edit-question.component';

const routes: Routes = [
  { path: 'questions', component: QuestionListComponent },
  { path: 'questions/create', component: CreateQuestionComponent },
  { path: 'questions/:id/edit', component: EditQuestionComponent },
  { path: 'questions/:id', component: QuestionDetailComponent },
  { path: '', redirectTo: '/questions', pathMatch: 'full' },
  { path: '**', component: NotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
