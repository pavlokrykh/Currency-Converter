import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CurrencyService {

  constructor( private http: HttpClient) { }

  public getRates(from: string, to: string): Observable<{result: string}> {
    let url = `https://api.exchangerate.host/convert?from=${from}&to=${to}`;
    return this.http.get<{ result: string }>(url);
  }

}
