import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { SharedModule } from '../shared/shared.module';

import { IonicModule } from '@ionic/angular';

import { Tap4PageRoutingModule } from './tap4-routing.module';

import { Tap4Page } from './tap4.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    Tap4PageRoutingModule,
    TranslateModule,
    SharedModule
  ],
  declarations: [Tap4Page]
})
export class Tap4PageModule {}
