import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutPageComponent } from './layout-page.component';
import { ListPageComponent } from 'src/app/phrasal-verbs/pages/list-page/list-page.component';
import { DetailsPageComponent } from 'src/app/phrasal-verbs/pages/details-page/details-page.component';


// localhost:4200/dashboard
const routes: Routes = [
  {
    path: '',
    component: LayoutPageComponent,
    children: [
      { path: 'phrasal-verbs-sqlite', component: ListPageComponent },
      { path: 'phrasal-verbs-sqlite/:id/definition/:definitionId', component: DetailsPageComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LayoutRoutingModule { }