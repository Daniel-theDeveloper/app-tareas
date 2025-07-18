import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Tab1Page } from './tab1.page';
import { TranslateModule } from '@ngx-translate/core';
import { ExploreContainerComponentModule } from '../explore-container/explore-container.module';
import { TaskCardComponent } from '../components/task-card/task-card.component';

import { Tab1PageRoutingModule } from './tab1-routing.module';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    ExploreContainerComponentModule,
    Tab1PageRoutingModule,
    TranslateModule
  ],
  declarations: [Tab1Page, TaskCardComponent],
})
export class Tab1PageModule {}
