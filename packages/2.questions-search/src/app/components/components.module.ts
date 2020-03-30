// Modules
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatToolbarModule } from '@angular/material';
import { RouterModule } from '@angular/router';
// Components
import { FooterComponent } from './footer/footer.component';
import { NavbarComponent } from './navbar/navbar.component';
import { QuestionCardComponent } from './questions/question-card/question-card.component';
import { QuestionMakerComponent } from './questions/question-maker/question-maker.component';

@NgModule({
  declarations: [
    QuestionCardComponent,
    NavbarComponent,
    FooterComponent,
    QuestionMakerComponent
  ],
  imports: [
    MatToolbarModule,
    CommonModule,
    RouterModule
  ],
  exports: [
    QuestionCardComponent,
    NavbarComponent,
    FooterComponent
  ]
})
export class ComponentsModule { }
