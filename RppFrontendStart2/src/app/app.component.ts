import { Component } from '@angular/core';
//drvo ugnjezdenih komponenti gde ce se granati kako se nasa aplikacija razvija
@Component({ //ovo je dekorator koji se nalazi nad app componentom
  //dekorator je isto sto anotacija u springu, samo sto ovde mozemo da prosledimo konfiguracioni objekat kao sto je ovde slucaj
  selector: 'app-root', //3 propertija - selektor - zamena za nasu komponentu --
  //ako u nekoj komponenti(nekoj html stranici) zelimo da prikazemo neku komponentu
  //necemo kopirati i paste ceo html kod te komponente vec cemo samo njene prikaze menjati ovim selektom
  templateUrl: './app.component.html',//putanja do HTML-a ove nase komponente -- za nasu app componentu koristimo app.component.html
  styleUrls: ['./app.component.scss'] // putanja do svih fajlova koji mogu da stilizuju nasu komponentu
})//ovako smo definisali konfiguracione stvari kada govorimo o rutnooj konfiguracionoj komponenti
export class AppComponent {
  title = 'RppFrontendStart2';
}
