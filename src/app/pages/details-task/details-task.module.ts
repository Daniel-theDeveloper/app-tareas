import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DetailsTaskPageRoutingModule } from './details-task-routing.module';

import { DetailsTaskPage } from './details-task.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DetailsTaskPageRoutingModule
  ],
  declarations: [DetailsTaskPage]
})
export class DetailsTaskPageModule {}
