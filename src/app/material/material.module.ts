import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import {MatSelectModule} from '@angular/material/select';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatMenuModule} from '@angular/material/menu';
import {MatBadgeModule} from '@angular/material/badge';







@NgModule({
  declarations: [],
  exports: [
    MatButtonModule,
    MatCardModule,
    MatSelectModule,
    MatFormFieldModule,
    MatMenuModule,
    MatBadgeModule

  ],
  imports: [
    CommonModule
  ]
})
export class MaterialModule { }
