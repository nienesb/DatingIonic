import { Injectable } from '@angular/core';
import {Http, Response, Headers, RequestOptions} from '@angular/http';
import 'rxjs/add/operator/map';
import {AuthService} from "../auth-service";

@Injectable()
export class StatisticProvider {

  apiToken: String;
  baseUrl: String = "https://rest-api.janine.project89109.nl";
  private headers = new Headers();
  constructor(public http: Http, private authService: AuthService) {
  }

  setHeaders() {
    this.apiToken = this.authService.getToken();
    this.headers = new Headers();
    this.headers.append("Authorization", "token "+this.apiToken);
  }
  getDailyTargets() {
    this.setHeaders();
    return this.http.get(this.baseUrl + "/stats/daily-targets?year=2017&month=6", {headers: this.headers})
      .map((res: Response) => {
        return res.json();
      })
  }

  getDailyPrognostics() {
    this.setHeaders();
    return this.http.get(this.baseUrl + "/stats/dailyprognostic?start=2017-05-01%2000%3A00%3A00&end=2017-05-31%2000%3A00%3A00", {headers: this.headers})
      .map((res: Response) => {
        return res.json();
      })
  }

  getMonthlyPrognostic() {
    this.setHeaders();
    return this.http.get(this.baseUrl + "/stats/monthly-prognostic/platforms?start=2017-05-01%2000%3A00%3A00&end=2017-05-31%2000%3A00%3A00",
      {headers: this.headers})
      .map((res: Response) => {
        return res.json();
      })
  }

  getDailyPrognosticForPlatform(platform: number, start: string, end: string) {
    this.setHeaders();
    return this.http.get(this.baseUrl + "/stats/dailyprognostic?platformId="+platform+"&start="+start+"&end="+end, {headers: this.headers})
      .map((res: Response) => {
        return res.json();
      })
  }

}
