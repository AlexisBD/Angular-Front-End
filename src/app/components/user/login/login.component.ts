import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { UserInterface } from 'src/app/models/user-interface';
import { DataApiService } from '../../../services/data-api.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  private user: UserInterface = {
    username:'',
    password:''
  }

  constructor(private authService: AuthService, private router: Router, private dataApiService: DataApiService) { }

  ngOnInit() {
  }

  onLogin(){
    return this.authService.loginUser(this.user.username, this.user.password)
    .subscribe(data => {
      this.dataApiService.setToken(data.token);
      console.log('Token es ' + data.token);
      this.router.navigate(['dashboard']);
    },
    error => {
      console.log(error.error.non_field_errors);
    })
  }
}
