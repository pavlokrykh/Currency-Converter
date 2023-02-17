import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { CurrencyService } from 'src/app/currency.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, OnDestroy {

  public usdRate?: string;
  public eurRate?: string;

  private ngUnsubscribe = new Subject<void>();



  constructor( private currency: CurrencyService ) {}

  public ngOnInit(): void {

    this.currency.getRates('USD', 'UAH')
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe(
        rate => {
          this.usdRate = Number(rate.result).toFixed(2);
        },
        err => {
          console.log('HTTP Error', err)
        }
      )
    

    this.currency.getRates('EUR', 'UAH')
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe(
        rate => {
          this.eurRate = Number(rate.result).toFixed(2);
        }, 
        err => {
          console.log('HTTP Error', err)
        }
      )

  }

  public ngOnDestroy(): void {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }
  
}
