import { Component, WritableSignal, signal } from '@angular/core';
import { ConfigService } from './config/config.service';
import { TranslateService } from '@ngx-translate/core';
import { LocalNotifications } from '@capacitor/local-notifications';

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
    this.config.initializePlugin();
    this.config.getLanguaje().then((res: string) => {
      this.translateService.setDefaultLang(res);
      this.translateService.use(res);
    });
    this.requestPermission();
  }

  async requestPermission() {
    const granted = await LocalNotifications.requestPermissions();
    if (granted) {
      console.log("Con permisos");
    } else {
      console.log("Sin permisos");
    }
  }
  async ngOnInit() {
    await LocalNotifications.registerActionTypes({
      types: [
        {
          id: 'TASK_ACTIONS',
          actions: [
            {
              id: 'finish',
              title: 'Marcar como terminada',
            },
            // {
            //   id: 'postpone',
            //   title: 'Posponer'
            // }
          ],
        },
      ],
    });
  }
}
