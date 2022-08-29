import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Sektor } from '../model/sektor';

@Injectable({
  providedIn: 'root'
})
export class SektorService {
  private readonly API_URL = 'http://localhost:8082/sektor/';
  private readonly API_URL_BYID = 'http://localhost:8082/sektoriZaPreduzeceById/';
  dataChange: BehaviorSubject<Sektor[]> = new BehaviorSubject<Sektor[]>([]);
  constructor(private httpClient: HttpClient) { }

  public getAllSektor(): Observable<Sektor[]> {
    this.httpClient.get<Sektor[]>(this.API_URL).subscribe(data => {
        this.dataChange.next(data);
    },
    (error: HttpErrorResponse) => {
        console.log(error.name + ' ' + error.message);
    });

    return this.dataChange.asObservable();
}
    public addSektor(sektor: Sektor): void {
        this.httpClient.post(this.API_URL, sektor).subscribe();
    }

    public updateSektor(sektor: Sektor): void {
        this.httpClient.put(this.API_URL, sektor).subscribe();
    }

    public deleteSektor(id: number): void {
        console.log(this.API_URL + id);
        this.httpClient.delete(this.API_URL + id).subscribe();
    }

    public getSektorZaPreduzece(idPreduzeca): Observable<Sektor[]> {
      this.httpClient.get<Sektor[]>(this.API_URL_BYID + idPreduzeca)
      .subscribe(data => {
          this.dataChange.next(data);
      },
      (error: HttpErrorResponse) => {
          console.log(error.name + ' ' + error.message);
      });
      return this.dataChange.asObservable();
  }
}
