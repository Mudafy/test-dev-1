import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from './material.module';
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
import { CreateQuestionDialogComponent } from './components/create question dialog/create-question-dialog.component';


@NgModule({
  declarations: [
    AppComponent,
    QuestionListComponent,
    CreateQuestionDialogComponent,
    QuestionDetailComponent,
    QuestionCardComponent,
    NavbarComponent,
    FooterComponent,
    NotFoundComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [QuestionsService],
  bootstrap: [AppComponent],
  entryComponents: [ CreateQuestionDialogComponent ]
})
export class AppModule { }
