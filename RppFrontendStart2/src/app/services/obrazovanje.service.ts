import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Obrazovanje } from '../model/obrazovanje';

@Injectable()//vodi racuna o injekciji potrebnih zavisnosti //ovde mozemo injektovati i dependencies drugih klasa
//providedIn: 'root' //umesto da smo sami u app.module.ts morali definisati provajdera ObrazovanjeService, ovo to radi automatski

export class ObrazovanjeService {

  private readonly API_URL = 'http://localhost:8082/obrazovanje/';

  dataChange: BehaviorSubject<Obrazovanje[]> = new BehaviorSubject<Obrazovanje[]>([]);
  constructor(private httpClient: HttpClient) { }

  public getAllObrazovanje(): Observable<Obrazovanje[]> {
    this.httpClient.get<Obrazovanje[]>(this.API_URL).subscribe(data => {
      this.dataChange.next(data);
    },
      (error: HttpErrorResponse) => {
        console.log(error.name + ' ' + error.message);
      });
    return this.dataChange.asObservable();
  }


  public addObrazovanje(obrazovanje: Obrazovanje): void {
    this.httpClient.post(this.API_URL, obrazovanje).subscribe();
  }

  public updateObrazovanje(obrazovanje: Obrazovanje): void {
    this.httpClient.put(this.API_URL, obrazovanje).subscribe();
  }

  public deleteObrazovanje(id: number): void {
    console.log(this.API_URL + id);
    this.httpClient.delete(this.API_URL + id).subscribe();
  }
}
