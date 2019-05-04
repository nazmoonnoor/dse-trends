import { Component, OnInit } from '@angular/core';
import { ApiService } from './../../../core/services/api.service';
import { Observable, of } from 'rxjs';
import { TypeaheadMatch } from 'ngx-bootstrap/typeahead';
import { mergeMap } from 'rxjs/operators';

@Component({
  selector: 'app-chart-now',
  templateUrl: './chart-now.component.html',
  styleUrls: ['./chart-now.component.css']
})
export class ChartNowComponent implements OnInit {

  sectors: any;
  allStocks: any;
  daysStocks: any;
  stocks: any;
  startDate: any;
  endDate: any;
  cycle: any;
  result = 0;
  hideUnwantedSectors: any;
  ignoreSectors: any;
  printDates: any;
  selectedSingleStock: string;
  singleAllStocks: string[] = [];
  singleStocks: string[] = [];
  
  // https://cors-anywhere.herokuapp.com/
  private stockUrl = `https://cors-anywhere.herokuapp.com/https://www.amarstock.com/LatestPrice/GetLatestPriceList`;

  private daysUrl = `https://cors-anywhere.herokuapp.com/https://www.amarstock.com/top/all/mostactiveblock`;

  private sectorUrl = `https://cors-anywhere.herokuapp.com/https://www.amarstock.com/LatestPrice/Getsectors`;
  
  constructor(public apiService: ApiService) { }

  ngOnInit() {
    this.hideUnwantedSectors = true;
    this.ignoreSectors = ["Mutual Funds", "Corporate Bond"];
    this.endDate=this.getDate(2, 1, 0);
    this.byHour();
    //return;

    this.apiService
      .getRequest(this.daysUrl)
      .subscribe(
        data => {
          this.daysStocks = data;
          //console.log(this.daysStocks);
          this.singleAllStocks = this.daysStocks.map(x=>x.Scrip);
          console.log(this.singleAllStocks);
        },
        err => {
          console.log(err);
        }
      );

    this.apiService
      .getRequest(this.stockUrl)
      .subscribe(
        data => {
          this.allStocks = this.getStocks(data);
          let unique = this.uniqueSectors();
          this.allSectors();
        },
        err => {
          console.log(err);
        }
      );
  }

  getDate(adj_d, adj_m, adj_y): any{
    var today = new Date();
    var dd = String(today.getDate() + adj_d).padStart(2, '0');
    var mm = String(today.getMonth() + adj_m).padStart(2, '0'); //January is 0!
    var yyyy = today.getFullYear() + adj_y;

    return yyyy+mm+dd;
  }

  byHour(): any{
    this.startDate=this.getDate(2, -3, 0);
    //this.endDate="20190501";
    this.cycle="Hour1";
  }

  byDay(): any{
    this.startDate=this.getDate(2, 1, -1);
    //this.endDate="20190501";
    this.cycle="Day1";
  }

  loadSector(load: boolean): any {
    this.sectors = !load ? [] : ["BANK", "CEMENT", "CERAMICS SECTOR", "ENGINEERING", "FINANCIAL INSTITUTIONS", "FOOD AND ALLIED", "INSURANCE", "IT SECTOR", "JUTE", "MISCELLANEOUS", "MUTUAL FUNDS", "PAPER AND PRINTING", "PHARMACEUTICALS &amp; CHEMICALS", "PHARMACEUTICALS AND CHEMICALS", "SERVICES AND REAL ESTATE", "TANNERY INDUSTRIES", "TELECOMMUNICATION", "TEXTILE", "TRAVEL AND LEISURE" ];
  }

  getStocks (data: any): any {
    return data.sort((a, b) => parseFloat(b.ChangePer) - parseFloat(a.ChangePer)); 
  }

  getSector(sector: any): any {
    this.apiService
      .getRequest(this.sectorUrl)
      .subscribe(
        data => {
          this.allStocks = data;

          this.stocks = this.getStocks(this.allStocks[sector]);
          //console.log(this.stocks);
          this.result = this.stocks.length;
        },
        err => {
          console.log(err);
        }
      );
  }

  searchSector(value): any {
    this.stocks = this.allStocks.filter(
      function(e) {
        return e.BusinessSegment.indexOf(value) >= 0; 
    });
    console.log(this.stocks);
    this.result = this.stocks.length;
  }

  allSectors(): any {
    this.loadSector(true);
    this.stocks = [];
  }

  search(value): any {
    let selected = value.replace(/\s/g, ",").replace(/(?:\r\n|\r|\n)/g, ',').replace(/\s/g, "");
    this.stocks = this.searchStocks(this.ignoreSectors, selected);
    console.log(this.stocks);
    this.result = this.stocks.length;
  }

  private searchStocks(objectArray: any, array: any) {
    this.loadSector(false);
    return this.allStocks.filter(
      function(e) {
        if(true){
          return array.indexOf(e.Scrip) >= 0 && objectArray.indexOf(e.BusinessSegment) < 0 && e.MarketCategory !== 'Z' + ",";  
        }
        else
          return array.indexOf(e.Scrip) >= 0;
    }, array);
  }

  private uniqueSectors() { 
      // var unique = [];
      // for(var i= 0; i<this.allStocks.length;i++){
      //   if(unique.indexOf(this.allStocks[i].BusinessSegment) < 0)
      //     unique.push(this.allStocks[i].BusinessSegment);
      // }
      let unique = ["Insurance", "Textile", "Cement", "Food & Allied", "Financial Institutions", "Engineering", "Mutual Funds", "IT Sector", "Fuel & Power", "Pharmaceuticals & Chemicals", "Bank", "Miscellaneous", "Ceramics Sector", "Paper & Printing", "Services & Real Estate", "Corporate Bond", "Tannery Industries", "Telecommunication", "Jute", "Travel & Leisure", ""];
      return unique;
  }

  toggleUnwantedSector(event) {
      if ( event.target.checked ) {
          this.hideUnwantedSectors = true;
      } else{
        this.hideUnwantedSectors = false;
      }
  }

  typeaheadOnSelect(e: TypeaheadMatch): void {
    console.log('Selected value: ', e.value);
    this.singleStocks.push(e.value);
    this.stocks = this.searchStocks([],this.singleStocks);
  }

  scanHigh() {
    var scan = [];
    for(var i=0;i<this.daysStocks.length;i++){
      var dst = this.daysStocks[i];
      if(dst.Quotes.length < 1) { continue; }
      let lastDayHigh = dst.Quotes[dst.Quotes.length - 2].High;
      if(dst.LTP > lastDayHigh){
        scan.push(dst.Scrip);
      }
    }
    this.stocks = this.searchStocks(this.ignoreSectors, scan);;
    this.result = this.stocks.length; 
  }

  scanHigher() {
    var scan = [];
    for(var i=0;i<this.daysStocks.length;i++){
      var dst = this.daysStocks[i];
      if(dst.Quotes.length < 1) { continue; }
      let quotes = this.getQuotes(dst.Quotes, 3);
      let lastDayHigh = quotes[1].High;
      let lastDayClose = quotes[1].Close;
      let dayBeforeHigh = quotes[2].High;
      if(dst.LTP > lastDayHigh && lastDayClose > dayBeforeHigh) {
        scan.push(dst.Scrip);
      }
    }
    this.stocks = this.searchStocks(this.ignoreSectors, scan);;
    this.result = this.stocks.length; 
  }

  scanHighest() {
    var scan = [];
    for(var i=0;i<this.daysStocks.length;i++){
      var dst = this.daysStocks[i];
      if(dst.Quotes.length < 1) { continue; }
      let quotes = this.getQuotes(dst.Quotes, 4);
      let lastDayHigh = quotes[1].High;
      let lastDayClose = quotes[1].Close;
      let dayBeforeHigh = quotes[2].High;
      let dayBeforeClose = quotes[2].Close;
      let dayEvenBeforeHigh = quotes[3].High;
      if(dst.LTP > lastDayHigh && lastDayClose > dayBeforeHigh &&  dayBeforeClose > dayEvenBeforeHigh) {
        scan.push(dst.Scrip);
      }
    }
    this.stocks = this.searchStocks(this.ignoreSectors, scan);;
    this.result = this.stocks.length; 
  }

  getQuotes(quotes, counter) {
    if(quotes.length < 1) return [];
    let result = [];
    let today = this.dateStringToDate(quotes[quotes.length-1].DateString);
    result.push(quotes[quotes.length-1]);

    for(let i=quotes.length-1; i>=0 ; i--) {
      let date = this.dateStringToDate(quotes[i].DateString);
      if(today.toDateString() != date.toDateString()){
        result.push(quotes[i]);
        today = date;
      }
      if(result.length === counter) { break; }
    }
    this.printDateStrings(result);
    return result;
  }

  dateStringToDate(str){
      let d = str.split(' ');
      let parts = d[0].split('/');
      return new Date(parts[2], parts[1]-1, parts[0]);
  }

  printDateStrings(quotes) {
    let dates = '';
    for(let i=0; i<quotes.length; i++)
      dates += quotes[i].DateString.split(' ')[0] + ' ';

    this.printDates = dates;
  }

  searchBullish(percentage: any, days: any) {
    var bullish =[];
    for(var i=0;i<this.daysStocks.length;i++){
      var st = this.daysStocks[i];
      if(st.Quotes.length < days) continue;
      var startingOpen = st.Quotes[st.Quotes.length-1-days].Open;
      var lastClose = st.Quotes[st.Quotes.length-1].Close;
      lastClose = lastClose === 0 ? st.Quotes[st.Quotes.length-1].High : lastClose;

      var gap = lastClose - startingOpen;
      if((gap*100)/startingOpen >= parseInt(percentage)) {
        bullish.push(this.allStocks[i]);
      }
    }
    this.stocks = bullish;
    this.result = this.stocks.length;
  }
}