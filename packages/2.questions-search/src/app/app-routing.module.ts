import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NotFoundComponent } from './views/questions/not-found/not-found.component';
import { QuestionDetailComponent } from './views/questions/question-detail/question-detail.component';
import { QuestionListComponent } from './views/questions/question-list/question-list.component';
import { QuestionMakerComponent } from './components/questions/question-maker/question-maker.component';

const routes: Routes = [

  { path: 'questions', component: QuestionListComponent, data: { titulo: 'Todas'} },
  { path: 'questions/create', component: QuestionMakerComponent, data: { titulo: 'Crear'} },
  { path: 'questions/modify/:id', component: QuestionMakerComponent, data: { titulo: 'Modificar'} },
  { path: 'questions/:id', component: QuestionDetailComponent, data: { titulo: 'Detalle'} },
  { path: '', redirectTo: '/questions', pathMatch: 'full' },
  { path: '**', component: NotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
