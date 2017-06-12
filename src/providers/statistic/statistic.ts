import { Injectable } from '@angular/core';
import { Http , Response, Headers} from '@angular/http';
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
    this.headers.append("Authorization", "token "+this.apiToken);
  }
  getDailyTargets() {
    this.setHeaders();
    return this.http.get(this.baseUrl + "/stats/daily-targets", {headers: this.headers})
      .map((res: Response) => {
        return res.json();
      })
  }

  getDailyPrognostics() {
    this.setHeaders();
    return this.http.get(this.baseUrl + "/stats/dailyprognostic", {headers: this.headers})
      .map((res: Response) => {
        return res.json();
      })
  }

  getMonthlyPrognostic() {
    this.setHeaders();
    return this.http.get(this.baseUrl + "/stats/monthly-prognostic/platforms?start=2017-05-01&end=2017-06-01", {headers: this.headers})
      .map((res: Response) => {
        return res.json();
      })
  }

  getManagers() {
    this.setHeaders();
    return this.http.get(this.baseUrl + "/managers", {headers: this.headers})
      .map((res: Response) => {
        return res.json();
      })
  }

  getPartners() {
    this.setHeaders();
    return this.http.get(this.baseUrl + "/partners", {headers: this.headers})
      .map((res: Response) => {
        return res.json();
      })
  }


}
