import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { Tap4Page } from './tap4.page';

const routes: Routes = [
  {
    path: '',
    component: Tap4Page
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class Tap4PageRoutingModule {}
