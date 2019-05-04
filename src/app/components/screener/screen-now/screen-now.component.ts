import { Component, OnInit } from '@angular/core';
import { ApiService } from './../../../core/services/api.service';
import { Screener } from './../../../core/models/screener';

@Component({
  selector: 'app-screen-now',
  templateUrl: './screen-now.component.html',
  styleUrls: ['./screen-now.component.css']
})

export class ScreenNowComponent implements OnInit {

  sectors: any;
  stocks: any;
  result = 0;
  screener: Screener = new Screener();

  constructor(public apiService: ApiService) { 

  }

  ngOnInit() {
    this.apiService
          .getHtmlResponse(this.screener.getUrl(this.screener.macd31016))
          .subscribe(
              data => {
                console.log(data);
                //this.stocks = this.getStocks(data);
                //this.result = this.stocks.length;
              },
              err => {
                console.log(err);
              }
          );
  }


  getTableData() {
        var myTab = document.getElementById('sample_1');
        console.log(myTab);
        // LOOP THROUGH EACH ROW OF THE TABLE AFTER HEADER.
        // for (var i = 1; i < myTab.rows.length; i++) {

        //     // GET THE CELLS COLLECTION OF THE CURRENT ROW.
        //     var objCells = myTab.rows.item(i).cells;

        //     // LOOP THROUGH EACH CELL OF THE CURENT ROW TO READ CELL VALUES.
        //     for (var j = 0; j < objCells.length; j++) {
        //         info.innerHTML = info.innerHTML + ' ' + objCells.item(j).innerHTML;
        //     }
        //     info.innerHTML = info.innerHTML + '<br />';     // ADD A BREAK (TAG).
        // }
    }

}