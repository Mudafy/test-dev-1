import { NgModule } from '@angular/core';

import {
  MatToolbarModule,
  MatTableModule,
  MatButtonModule,
  MatCardModule,
  MatIconModule,
  MatDialogModule,
  MatFormFieldModule,
  MatInputModule,
  MatSortModule,
  MatProgressSpinnerModule,
  MatCheckboxModule
} from '@angular/material';

@NgModule({
  imports: [
    MatToolbarModule,
    MatTableModule,
    MatButtonModule,
    MatCardModule,
    MatIconModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatSortModule,
    MatProgressSpinnerModule,
    MatCheckboxModule
  ],
  exports: [
    MatToolbarModule,
    MatTableModule,
    MatButtonModule,
    MatCardModule,
    MatIconModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatSortModule,
    MatProgressSpinnerModule,
    MatCheckboxModule
  ]
})
export class MaterialModule {}