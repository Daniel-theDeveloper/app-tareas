import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';

@Injectable({
  providedIn: 'root'
})
export class ConfigService {

  constructor(
    private storage: Storage
  ) { }

  async initializePlugin() {
    await this.storage.create();
  }

  async setLanguaje(languaje: string) {
    // es: español
    // en: english
    await this.storage.set("languaje", languaje);
  }

  async getLanguaje() {
    let languaje = await this.storage.get("languaje");
    if (languaje === null) {
      this.setLanguaje("es");
      return "es";
    }
    return languaje;
  }
}
