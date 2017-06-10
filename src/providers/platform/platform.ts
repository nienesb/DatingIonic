import { Injectable } from '@angular/core';
import { Http , Response, Headers} from '@angular/http';
import 'rxjs/add/operator/map';
import {AuthService} from "../auth-service";


@Injectable()
export class PlatformProvider {

  apiToken: String;
  baseUrl: string = "https://rest-api.janine.project89109.nl/platforms";
  private headers = new Headers();
  constructor(public http: Http, private authService: AuthService) {
  }

  setHeaders() {
    this.apiToken = this.authService.getToken();
    this.headers.append("Authorization", "token "+this.apiToken);
  }
  getPlatforms() {
    this.setHeaders();
    return this.http.get(this.baseUrl, {headers: this.headers})
      .map((res: Response) => {
        return res.json();
      })
  }
}
