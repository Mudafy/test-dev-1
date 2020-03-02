import { NgModule } from '@angular/core';
import { MatToolbarModule, MatTableModule, MatSortModule,
          MatIconModule, MatPaginatorModule, MatFormFieldModule, MatInputModule, MatProgressSpinnerModule } from '@angular/material';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FooterComponent } from './components/footer/footer.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { QuestionCardComponent } from './components/questions/question-card/question-card.component';
import { QuestionsService } from './services/questions.service';
import { NotFoundComponent } from './views/questions/not-found/not-found.component';
import { QuestionDetailComponent } from './views/questions/question-detail/question-detail.component';
import { QuestionListComponent } from './views/questions/question-list/question-list.component';
import { CreateQuestionComponent } from './forms/create-question/create-question.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { EditQuestionComponent } from './forms/edit-question/edit-question.component';
import { SpinnerComponent } from './components/spinner/spinner.component';

@NgModule({
  declarations: [
    AppComponent,
    QuestionListComponent,
    QuestionDetailComponent,
    QuestionCardComponent,
    NavbarComponent,
    FooterComponent,
    NotFoundComponent,
    CreateQuestionComponent,
    EditQuestionComponent,
    SpinnerComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatTableModule,
    MatSortModule,
    MatIconModule,
    MatPaginatorModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule,
    MatProgressSpinnerModule
  ],
  providers: [QuestionsService],
  bootstrap: [AppComponent]
})
export class AppModule { }
