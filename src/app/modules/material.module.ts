import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {
  MatSlideToggleModule,
  MatToolbarModule,
  MatDividerModule,
  MatButtonModule
} from '@angular/material';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    MatSlideToggleModule,
    MatToolbarModule,
    MatDividerModule,
    MatButtonModule
  ],
  exports: [
    MatSlideToggleModule,
    MatToolbarModule,
    MatDividerModule,
    MatButtonModule
  ]
})
export class MaterialModule { }
