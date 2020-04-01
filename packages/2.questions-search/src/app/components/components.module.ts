// Modules
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
// Components
import { FooterComponent } from './footer/footer.component';
import { NavbarComponent } from './navbar/navbar.component';
import { QuestionCardComponent } from './questions/question-card/question-card.component';
import { QuestionMakerComponent } from './questions/question-maker/question-maker.component';
import { MaterialModule } from '../material/material.module';
import { BreadcrumbsComponent } from './breadcrumbs/breadcrumbs.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { QuestionItemComponent } from './sidebar/question-item/question-item.component';
import { SecureDeleteComponent } from './secure-delete/secure-delete.component';
@NgModule({
  declarations: [
    QuestionCardComponent,
    NavbarComponent,
    FooterComponent,
    QuestionMakerComponent,
    BreadcrumbsComponent,
    SidebarComponent,
    QuestionItemComponent,
    SecureDeleteComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    RouterModule
  ],
  exports: [
    QuestionCardComponent,
    NavbarComponent,
    FooterComponent,
    QuestionMakerComponent,
    BreadcrumbsComponent,
    SidebarComponent,
    QuestionItemComponent,
    SecureDeleteComponent
  ]
})
export class ComponentsModule { }
