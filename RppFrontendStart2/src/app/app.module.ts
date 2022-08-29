import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MatButtonModule } from '@angular/material/button'
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSelectModule } from '@angular/material/select';
import { MatOptionModule, MAT_DATE_LOCALE } from '@angular/material/core';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatDialogModule } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';





import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';

import { ObrazovanjeService } from './services/obrazovanje.service';
import { PreduzeceService } from './services/preduzece.service';
import { RadnikService } from './services/radnik.service';

import { AppComponent } from './app.component';
import { ObrazovanjeComponent } from './obrazovanje/obrazovanje.component';
import { PreduzeceComponent } from './preduzece/preduzece.component';
import { SektorComponent } from './sektor/sektor.component';
import { RadnikComponent } from './radnik/radnik.component';
import { AboutComponent } from './core/about/about.component';
import { HomeComponent } from './core/home/home.component';
import { AuthorComponent } from './core/author/author.component';
import { ObrazovanjeDialogComponent } from './dialogs/obrazovanje-dialog/obrazovanje-dialog.component';
import { PreduzeceDialogComponent } from './dialogs/preduzece-dialog/preduzece-dialog.component';
import { SektorDialogComponent } from './dialogs/sektor-dialog/sektor-dialog.component';
import { RadnikDialogComponent } from './dialogs/radnik-dialog/radnik-dialog.component';
import { RouterModule } from '@angular/router';




//RUTIRANJE se vrsi u odvojenom modulu (app-routing module ts) a mi taj modul importujemo ovde



@NgModule({ //dekorator
  declarations: [ //niz svih komponenti koje ce biti definisane na nivou angular aplikacije
    AppComponent,
    ObrazovanjeComponent,
    PreduzeceComponent,
    SektorComponent,
    RadnikComponent,
    AboutComponent,
    HomeComponent,
    AuthorComponent,
    ObrazovanjeDialogComponent,
    PreduzeceDialogComponent,
    SektorDialogComponent,
    RadnikDialogComponent
  ],
  imports: [ //ovde importujemo rout modul //svako modul koji ovde bude definisan, mocice da se koristi bilo gde u nasoj aplikaciji
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule, //za animacije u okviru browser-a
    MatButtonModule,
    MatSidenavModule,
    MatExpansionModule,
    MatIconModule,
    MatListModule,
    RouterModule.forRoot(Routes),
    HttpClientModule,
    FormsModule,
    MatGridListModule,
    MatPaginatorModule,
    MatTableModule,
    MatSortModule,
    MatToolbarModule,
    MatSelectModule,
    MatOptionModule,
    MatSnackBarModule,
    MatDialogModule,
    MatInputModule,
    ],
    entryComponents: [
      ObrazovanjeDialogComponent,
      PreduzeceDialogComponent,
      SektorDialogComponent,
      RadnikDialogComponent
    ]
  providers: [{provide: MAT_DATE_LOCALE, useValue: 'en-GB'}, ObrazovanjeService, PreduzeceService, RadnikService],//ovo se tice dependency injection -- ovde mozemo da definisemo tokene za svaku klasu koju zelimo da imamo u providers nizu i da istu instancu injektujemo u bilo koju klasu koju zelimo -- mi koristimo samo servisne klase pa nam ovo ne treba
  bootstrap: [AppComponent] ///definisemo koje to sve komponente bootstrapuju(ucitavaju) kada se ucita nas modul
})
export class AppModule { }//opet export da mozemo negde da importujemo po potrebi
