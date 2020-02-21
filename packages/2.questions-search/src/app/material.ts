import { MatToolbarModule } from '@angular/material/toolbar'; 
import { MatTableModule } from '@angular/material/table'; 
import { MatPaginatorModule } from '@angular/material/paginator';
import {MatButtonModule} from '@angular/material/button'; 

import { NgModule } from '@angular/core';

@NgModule({
    imports: [
        MatToolbarModule,
        MatTableModule,
        MatPaginatorModule,
        MatButtonModule
    ],
    exports: [
        MatToolbarModule,
        MatTableModule,
        MatPaginatorModule,
        MatButtonModule
    ]
})

export class MaterialModule { }