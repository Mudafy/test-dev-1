// Modules
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
// Routers
import { RouterModule } from '@angular/router';
import { AppRoutingModule } from './app-routing.module';
// Services
import { ServicesModule } from './services/services.module';
// Components
import { SharedModule } from './shared/shared.module';
import { ComponentsModule } from './components/components.module';
import { MatToolbarModule } from '@angular/material';
  // Views
import { ViewsModule } from './views/views.module';

// Components
import { AppComponent } from './app.component';
import { NotFoundComponent } from './views/questions/not-found/not-found.component';
import { MatSidenavModule } from '@angular/material/sidenav';



@NgModule({
  declarations: [
    AppComponent,
    NotFoundComponent,
  ],
  imports: [
    FormsModule,
    ReactiveFormsModule,
    MatSidenavModule,
    ViewsModule,
    RouterModule,
    SharedModule,
    ComponentsModule,
    BrowserModule,
    AppRoutingModule,
    MatToolbarModule,
    BrowserAnimationsModule,
    ServicesModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
