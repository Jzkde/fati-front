import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';



@NgModule({
  declarations: [],
  exports: [
    MatButtonModule,
    MatCardModule
  ],
  imports: [
    CommonModule
  ]
})
export class MaterialModule { }
