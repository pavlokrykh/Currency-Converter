import { Component, OnInit } from '@angular/core';
import { CurrencyService } from 'src/app/currency.service';

@Component({
  selector: 'app-converter',
  templateUrl: './converter.component.html',
  styleUrls: ['./converter.component.scss']
})
export class ConverterComponent implements OnInit {

  
  constructor( private currency: CurrencyService ) {}

  currencies: string[] = ['USD', 'EUR', 'UAH', 'JPY', 'GBP', 'CAD', 'SEK', 'NOK', 'PLN']
  selectedCurrencyLeft: string = 'USD'
  selectedCurrencyRight: string = 'UAH'
  valueLeft: number = 1
  valueRight: number = 1

  

  ngOnInit(): void {
    this.convertCurrencyLeft(1)
  }

  convertCurrencyLeft(n: number) {
    this.currency.getRates(this.selectedCurrencyRight, this.selectedCurrencyLeft).subscribe(rate => {
      let currRate = JSON.parse(JSON.stringify(rate))
      this.valueRight = Number(Number(n * currRate['result']).toFixed(2))
    })
  }

  convertCurrencyRight(n: number) {
    this.currency.getRates(this.selectedCurrencyLeft, this.selectedCurrencyRight).subscribe(rate => {
      let currRate = JSON.parse(JSON.stringify(rate))
      this.valueLeft = Number(Number(n * currRate['result']).toFixed(2))
    })
  }

  swap() {
    let tempCurrency = this.selectedCurrencyLeft
    let tempValue = this.valueLeft
    this.selectedCurrencyLeft = this.selectedCurrencyRight
    this.valueLeft = this.valueRight
    this.selectedCurrencyRight = tempCurrency
    this.valueRight = tempValue
  }
  

}
