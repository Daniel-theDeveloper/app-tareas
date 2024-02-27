import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';

import { IonicModule } from '@ionic/angular';

import { DetailsTaskPageRoutingModule } from './details-task-routing.module';

import { DetailsTaskPage } from './details-task.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DetailsTaskPageRoutingModule,
    TranslateModule
  ],
  declarations: [DetailsTaskPage]
})
export class DetailsTaskPageModule {}
