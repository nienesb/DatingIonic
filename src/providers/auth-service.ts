import { Injectable } from '@angular/core';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import {Http, Headers, Response} from "@angular/http";

@Injectable()
export class AuthService {
  baseUrl: String = "https://rest-api.janine.project89109.nl";
  currentUser: {};
  apiToken: String;

  constructor(private http: Http) {}

  public login(credentials) {
    if (credentials.email === null || credentials.password === null) {
      return Observable.throw("Please insert credentials");
    } else {
      return this.http.get(this.baseUrl + "/authentication/token?username="+credentials.email+"&password="+credentials.password)
        .map((res: Response) => {
          const response = res.json();
          this.apiToken = response.token;
          return response;
        })
    }
  }

  public getUserInfo() {
    return this.currentUser;
  }

  public logout() {
    return Observable.create(observer => {
      this.currentUser = null;
      this.apiToken = null;
      observer.next(true);
      observer.complete();
    });
  }

  public getToken() {
    return this.apiToken;
  }
}
