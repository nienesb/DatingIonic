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

  getDailyPrognosticForPlatform(platform: number, start: string, end: string) {
    this.setHeaders();
    return this.http.get(this.baseUrl + "/stats/dailyprognostic?limit=24&platformId="+platform+"&start="+start+"&end="+end, {headers: this.headers})
      .map((res: Response) => {
        return res.json();
      })
  }

  getMonthlyPrognosticForPlatform(platform: number, start: string, end: string) {
    this.setHeaders();
    return this.http.get(this.baseUrl + "/stats/monthly-prognostic/platforms?limit=31&platformId="+platform+"&start="+start+"&end="+end, {headers: this.headers})
      .map((res: Response) => {
        return res.json();
      })
  }

}
