import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CapitalPipe } from './capital.pipe';

@NgModule({
  declarations: [CapitalPipe],
  imports: [
    CommonModule
  ]
})
export class PipesModule { }
