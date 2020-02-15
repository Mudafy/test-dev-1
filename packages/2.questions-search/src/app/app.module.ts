import { NgModule } from '@angular/core';
import { MatToolbarModule, MatPaginatorIntl } from '@angular/material';
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
import { MaterialUiModule } from './modules/material-ui/material-ui.module';
import { Paginator } from './custom/paginator';
import { ReactiveFormsModule } from '@angular/forms'
import { FlexLayoutModule } from '@angular/flex-layout';
import { QuestionNewComponent } from './components/questions/question-new/question-new.component';
import { QuestionDeleteDialogComponent } from './components/questions/question-delete/question-delete.component';
import { QuestionEditComponent } from './components/questions/question-edit/question-edit.component';


@NgModule({
  declarations: [
    AppComponent,
    QuestionListComponent,
    QuestionDetailComponent,
    QuestionCardComponent,
    NavbarComponent,
    FooterComponent,
    NotFoundComponent,
    QuestionNewComponent,
    QuestionDeleteDialogComponent,
    QuestionEditComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MaterialUiModule,
    ReactiveFormsModule,    
    FlexLayoutModule
  ],
  entryComponents: [QuestionDeleteDialogComponent],
  providers: [QuestionsService, { provide: MatPaginatorIntl, useClass: Paginator }],
  bootstrap: [AppComponent]
})
export class AppModule { }
