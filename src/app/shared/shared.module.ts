import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../material/material.module';
import { LayoutPageComponent } from './layout-page/layout-page.component';
import { RouterModule } from '@angular/router';
import { PhrasalVerbsModule } from '../phrasal-verbs/phrasal-verbs.module';
import { HttpClientModule } from '@angular/common/http';


@NgModule({
  declarations: [
    LayoutPageComponent,
  ],
  imports: [
    CommonModule,
    PhrasalVerbsModule,
    MaterialModule,
    RouterModule,
    HttpClientModule
    
  ]
})
export class SharedModule { }
