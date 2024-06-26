import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListPageComponent } from './pages/list-page/list-page.component';

import { DetailsPageComponent } from './pages/details-page/details-page.component';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { LayoutRoutingModule } from '../shared/layout-page/layout.routing.module';
import { AddModalFormComponent } from './components/modal-form/add-modal-form.component';
import { MaterialModule } from '../material/material.module';
import { HttpClientModule } from '@angular/common/http';
import { MatPaginatorModule } from '@angular/material/paginator';
import { UpdateModalFormComponent } from './components/update-modal-form/update-modal-form.component';


@NgModule({
  declarations: [
    ListPageComponent,
    DetailsPageComponent,
    AddModalFormComponent,
    UpdateModalFormComponent,
  ],
  imports: [
    CommonModule,
    LayoutRoutingModule,
    MaterialModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    MatPaginatorModule
  ]
})
export class PhrasalVerbsModule { }
