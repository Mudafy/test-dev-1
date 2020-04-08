import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NotFoundComponent } from './views/questions/not-found/not-found.component';
import { QuestionDetailComponent } from './views/questions/question-detail/question-detail.component';
import { QuestionListComponent } from './views/questions/question-list/question-list.component';
import { QuestionModifyComponent } from './views/questions/question-modify/question-modify.component';
import { QuestionMakeComponent } from './views/questions/question-make/question-make.component';

const routes: Routes = [

  { path: 'questions', component: QuestionListComponent, data: { titulo: 'Todas'} },
  { path: 'questions/create', component: QuestionMakeComponent, data: { titulo: 'Crear'} },
  { path: 'questions/modify/:id', component: QuestionModifyComponent, data: { titulo: 'Modificar'} },
  { path: 'questions/:id', component: QuestionDetailComponent, data: { titulo: 'Detalle'} },
  { path: '', redirectTo: '/questions', pathMatch: 'full' },
  { path: '**', component: NotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
