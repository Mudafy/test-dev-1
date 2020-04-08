//Modules
import { NgModule } from '@angular/core';
import { MaterialModule } from '../material/material.module';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
//Components
import { FooterComponent        } from './footer/footer.component';
import { NavbarComponent        } from './navbar/navbar.component';
import { BreadcrumbsComponent   } from './breadcrumbs/breadcrumbs.component';
import { QuestionItemComponent  } from './sidebar/question-item/question-item.component';
import { SidebarComponent       } from './sidebar/sidebar.component';

@NgModule({
  declarations: [
    FooterComponent,
    NavbarComponent,
    BreadcrumbsComponent,
    SidebarComponent,
    QuestionItemComponent
  ],
  imports: [
    MaterialModule,
    RouterModule,
    CommonModule
  ],
  exports: [
    FooterComponent,
    NavbarComponent,
    BreadcrumbsComponent,
    SidebarComponent,
    QuestionItemComponent
  ]
})
export class SharedModule { }
