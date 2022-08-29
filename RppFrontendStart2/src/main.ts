import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';

//OVO JE GLAVNA ULAZNA TACKA NASE APLIKACIJE
  //kao main metoda , ona pokrece nasu aplikaciju i pokrece rutni aplikacioni modul AppModule i omogucava da bude prikazano u web browseru

if (environment.production) {
  enableProdMode();
}

platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));
