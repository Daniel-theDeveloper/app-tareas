import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

import { ScheduleCardComponent } from '../components/schedule-card/schedule-card.component';

// Este modulo, permite que el componente "ScheduleCardComponent" se use en diferentes paginas de la app
@NgModule({
  declarations: [ScheduleCardComponent],
  imports: [
    CommonModule,
    TranslateModule,
    FormsModule,
    IonicModule
  ],
  exports: [
    ScheduleCardComponent,
    TranslateModule,
    FormsModule,
    IonicModule
  ]
})
export class SharedModule { }
