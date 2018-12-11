import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';
import { map } from 'rxjs/operators';
//import { LoginComponent } from '../components/user/login/login.component';
import { DashboardInterface } from '../models/dashboard-interface';
import { AuthService } from './auth.service';
//import { url } from 'inspector';

@Injectable({
  providedIn: 'root'
})
export class DataApiService {
  url_api = 'http://127.0.0.1:8000/api/v1/test1/'
  public Token = ''
  constructor(private httpClient: HttpClient, private authService: AuthService) {  }
  Tests: Observable<any>;
  Test: Observable<any>;
  
  public Tokenfull = this.getToken();
  headers: HttpHeaders = new HttpHeaders()

  getAllTest (){
    this.headers = new HttpHeaders ({
      'Content-Type': 'application/json',
      'Authorization': 'Token ' + this.getToken()
    })    
    return this.httpClient.get(this.url_api, {headers: this.headers})
    .pipe(map(data => data))
  }
  
  setToken(Token){
    this.Token = Token;
  }
  getToken(){
    return this.Token;
  }    
}

