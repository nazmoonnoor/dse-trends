export class Screener {
    //"https://stockbangladesh.com/screeners/result?q=WyBNQUNEKDEwLCAzLCAxNiwgQ0xPU0UsIE1BQ0QpIFg+IE1BQ0QoMTAsIDMsIDE2LCBDTE9TRSwgU0lHTkFMKSBdIA=="
    base = "https://cors-anywhere.herokuapp.com/https://stockbangladesh.com/screeners/result?q=";
    macd31016 = `WyBNQUNEKDEwLCAzLCAxNiwgQ0xPU0UsIE1BQ0QpIFg+IE1BQ0QoMTAsIDMsIDE2LCBDTE9TRSwgU0lHTkFMKSBdIA==`;

    getUrl(key): any{
      return this.base + key;
    }
}
