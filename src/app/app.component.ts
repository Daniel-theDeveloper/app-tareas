import { Component, WritableSignal, signal } from '@angular/core';
import { ConfigService } from './config/config.service';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  
  constructor(
    private config: ConfigService,
    private translateService: TranslateService,
  ) {
    this.config.initializPlugin();
    this.config.getLanguaje().then((res: string) => {
      this.translateService.setDefaultLang(res);
      this.translateService.use(res);
    });
  }
  
  async ngOnInit() {}
}
