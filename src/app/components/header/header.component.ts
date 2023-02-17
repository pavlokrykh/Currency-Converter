import { Component, OnInit } from '@angular/core';
import { CurrencyService } from 'src/app/currency.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  usdRate: string | undefined
  eurRate: string | undefined


  constructor( private currency: CurrencyService ) {}

  ngOnInit(): void {
    this.currency.getRates('UAH', 'USD').subscribe(rate => {
      let currRate = JSON.parse(JSON.stringify(rate))
      this.usdRate = Number(currRate['result']).toFixed(2)
    })

    this.currency.getRates('UAH', 'EUR').subscribe(rate => {
      let currRate = JSON.parse(JSON.stringify(rate))
      this.eurRate = Number(currRate['result']).toFixed(2)
    })
  }

  getBaseRates() {
    
  }

}
