import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Radnik } from '../model/radnik';

@Injectable()
export class RadnikService {

 private readonly API_URL = 'http://localhost:8082/radnik/';

 dataChange: BehaviorSubject<Radnik[]> = new BehaviorSubject<Radnik[]>([]);
 constructor(private httpClient: HttpClient) { }

 public getAllRadnik(): Observable<Radnik[]> {
   this.httpClient.get<Radnik[]>(this.API_URL).subscribe(data => {
     this.dataChange.next(data);
   },
     (error: HttpErrorResponse) => {
       console.log(error.name + ' ' + error.message);
     });
   return this.dataChange.asObservable();
  }

  public addRadnik(radnik: Radnik): void {
    this.httpClient.post(this.API_URL, radnik).subscribe();
  }

  public updateRadnik(radnik: Radnik): void {
    this.httpClient.put(this.API_URL, radnik).subscribe();
  }

  public deleteRadnik(id: number): void {
    console.log(this.API_URL + id);
    this.httpClient.delete(this.API_URL + id).subscribe();
  }
}