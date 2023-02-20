import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { CurrencyService } from 'src/app/currency.service';

@Component({
  selector: 'app-converter',
  templateUrl: './converter.component.html',
  styleUrls: ['./converter.component.scss']
})
export class ConverterComponent implements OnInit, OnDestroy {

  
  constructor( private currency: CurrencyService ) {}

  private ngUnsubscribe = new Subject<void>();

  public currencies: string[] = ['USD', 'EUR', 'UAH', 'JPY', 'GBP', 'CAD', 'SEK', 'NOK', 'PLN']
  public selectedCurrencyLeft: string = 'USD'
  public selectedCurrencyRight: string = 'UAH'
  public valueLeft: number = 1
  public valueRight: number = 1

  

  public ngOnInit(): void {
    this.convertCurrencyLeft(1);
  }

  public convertCurrencyLeft(n: number): void {
    this.valueLeft = n
    this.currency.getRates(this.selectedCurrencyLeft, this.selectedCurrencyRight)
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe(
        rate => {
          this.valueRight = Number((n * Number(rate.result)).toFixed(2));
        }, 
        err => {
          console.log('HTTP Error', err);
        }
      )
  }

  public convertCurrencyRight(n: number): void {
    this.valueRight = n
    this.currency.getRates(this.selectedCurrencyRight, this.selectedCurrencyLeft)
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe(
        rate => {
          this.valueLeft = Number((n * Number(rate.result)).toFixed(2));
        }, 
        err => {
          console.log('HTTP Error', err);
        }
      )
  }

  public swap(): void {
    let tempCurrency = this.selectedCurrencyLeft;

    this.selectedCurrencyLeft = this.selectedCurrencyRight;

    this.selectedCurrencyRight = tempCurrency;

    this.convertCurrencyLeft(this.valueLeft)
  }
  
  
  public ngOnDestroy(): void {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }


}
