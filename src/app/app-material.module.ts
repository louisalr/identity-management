import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatTooltipModule} from "@angular/material/tooltip";
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";
import {MatSelectModule} from "@angular/material/select";

@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ],
  exports: [
    MatTooltipModule,
    MatProgressSpinnerModule,
    MatSelectModule
  ]
})
export class AppMaterialModule { }
