import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';
import { map } from 'rxjs/operators';
import { UserInterface } from '../models/user-interface';
import { DashboardInterface } from '../models/dashboard-interface';
//import { DashboardInterface } from '../models/dashboard-interface';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  endpoint = 'http://127.0.0.1:8000/api/v1/test1/'
  constructor(private httpClient: HttpClient) { }

  headers:HttpHeaders = new HttpHeaders({
    'Content-type': 'application/json'
  })

  loginUser(username: string, password: string): Observable<any>{
    const url_api = 'http://127.0.0.1:8000/api/v1/login/'
    return this.httpClient.post<UserInterface>(url_api, {      
      username: username,
      password: password,
      headers: this.headers
    }).pipe(map(data => data))
  }

  registerUser(username: string,  password: string, email: string): Observable<any>{
    const url_api = 'http://localhost:8000/api/v1/registration/'
    return this.httpClient.post<UserInterface>(url_api, {
      username:username, 
      email:email, 
      password1: password,
      password2: password, 
      headers: this.headers
    }).pipe(map(data => data))
  }
  headers2:HttpHeaders = new HttpHeaders({
    'Content-type': 'application/json',
    'Authorization': 'Token 89528352c427ea1f5ccf3e01bede2c82ebf6f118'
  })
  save(testName: string, testPate: string, testMate: string): Observable<any>{        
    return this.httpClient.post<DashboardInterface>(this.endpoint,{      
      testName: testName,
      testPate: testPate,
      testMate: testMate,
    }, {
      headers: this.headers2
    }).pipe(map(data => data))
  }

  update(id: string, testName: string, testPate: string, testMate: string): Observable<any>{        
    return this.httpClient.put<DashboardInterface>(this.endpoint + id,{
      testName: testName,
      testPate: testPate,
      testMate: testMate,
    }, {
      headers: this.headers2
    }).pipe(map(data => data))
  }

 delete(id: string): Observable<any>{      
    return this.httpClient.put<DashboardInterface>(this.endpoint + id,{
      delete:true,      
    }, {
      headers: this.headers2
    }).pipe(map(data => data))
  }
}
