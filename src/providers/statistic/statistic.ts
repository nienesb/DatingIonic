import { Injectable } from '@angular/core';
import { Http , Response, Headers} from '@angular/http';
import 'rxjs/add/operator/map';
import {AuthService} from "../auth-service";

@Injectable()
export class StatisticProvider {

  apiToken: String;
  baseUrl: String = "https://rest-api.janine.project89109.nl/stats";
  private headers = new Headers();
  constructor(public http: Http, private authService: AuthService) {
  }

  setHeaders() {
    this.apiToken = this.authService.getToken();
    this.headers.append("Authorization", "token "+this.apiToken);
  }
  getDailyTargets() {
    this.setHeaders();
    return this.http.get(this.baseUrl + "/daily-targets", {headers: this.headers})
      .map((res: Response) => {
        return res.json();
      })
  }

  getDailyPrognostics() {
    this.setHeaders();
    return this.http.get(this.baseUrl + "/dailyprognostic", {headers: this.headers})
      .map((res: Response) => {
        return res.json();
      })
  }




}
