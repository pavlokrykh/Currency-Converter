import { Injectable } from '@angular/core';
import { DatePipe } from '@angular/common'
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CurrencyService {

  constructor(private datePipe: DatePipe, private http: HttpClient) { }

  getDate() {
    let currentDate = new Date();
    return this.datePipe.transform(currentDate, 'dd.MM.yyyy')
  }

  getRates(from: string, to: string) {
    let url = `https://api.exchangerate.host/convert?from=${to}&to=${from}`
    return this.http.get(url)
  }

}
