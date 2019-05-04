import { Component, OnInit } from '@angular/core';
import { ApiService } from './../../../core/services/api.service';

@Component({
  selector: 'app-common',
  templateUrl: './common.component.html',
  styleUrls: ['./common.component.css']
})
export class CommonComponent implements OnInit {

  allStocks: any;
  stocks: any;
  startDate: any;
  endDate: any;
  result = 0;
  
  // https://cors-anywhere.herokuapp.com/
  private stockUrl = `https://cors-anywhere.herokuapp.com/https://www.amarstock.com/LatestPrice/GetLatestPriceList`;
  
  constructor(public apiService: ApiService) { }

  ngOnInit() {
    this.startDate="20180201";
    this.endDate="20181212";
    this.apiService
      .getStocks(this.stockUrl)
      .subscribe(
        data => {
          this.allStocks = data;
        },
        err => {
          console.log(err);
        }
      );
  }

  all(one, two): any {
    let first = one.replace(/\s/g, ",").replace(/(?:\r\n|\r|\n)/g, ',').replace(/\s/g, "");
    let second = two.replace(/\s/g, ",").replace(/(?:\r\n|\r|\n)/g, ',').replace(/\s/g, "");

    let firstStocks = this.isIndexOfArray(this.allStocks, first);
    let secondStocks = this.isIndexOfArray(this.allStocks, second);

    this.stocks = secondStocks;
    for(var i=0; i <firstStocks.length; i++) {
      if(second.indexOf(firstStocks[i].Scrip) >= -1)
        this.stocks.push(firstStocks[i]);
    }

    console.log(this.stocks);
    this.result = this.stocks.length;
  }
  common(one, two): any {
    let first = one.replace(/\s/g, ",").replace(/(?:\r\n|\r|\n)/g, ',').replace(/\s/g, "");
    let second = two.replace(/\s/g, ",").replace(/(?:\r\n|\r|\n)/g, ',').replace(/\s/g, "");

    let firstStocks = this.isIndexOfArray(this.allStocks, first);
    let secondStocks = this.isIndexOfArray(this.allStocks, second);

    this.stocks = this.isIndexOfArray(firstStocks, second);

    this.result = this.stocks.length;
  }

  private isIndexOfArray(objectArray: any, array: any){
    return objectArray.filter(
      function(e) {
        return array.indexOf(e.Scrip) >= 0;
    }, array);
  }
}