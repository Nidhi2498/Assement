import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DobexampleRoutingModule } from './dobexample-routing.module';
import { DobexampleComponent } from './dobexample.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    DobexampleComponent
  ],
  imports: [
    CommonModule,
    DobexampleRoutingModule,
    FormsModule
  ]
})
export class DobexampleModule { }
