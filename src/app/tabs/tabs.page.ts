import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { ConfigService } from '../config/config.service';

@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss']
})
export class TabsPage {

  constructor(
    private translateService: TranslateService,
    private config: ConfigService
  ) {
    this.config.getLanguaje().then((res: string) => {
      this.translateService.setDefaultLang(res);
      this.translateService.use(res);
    });
  }

}
