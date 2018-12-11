import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { UserInterface } from 'src/app/models/user-interface';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  private user: UserInterface = {
    username: '',
    password: '',
    email: '' 
  }

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit() {
  }

  onRegister(): void {
    this.authService.registerUser(this.user.username, this.user.password, this.user.email)
      .subscribe(data => {
        let token = data.key;
        alert('Usuario Creado');
        console.log(token);
        this.router.navigate(['/'])
      }, 
        error => {
          let e = error.error;
          console.log(e.username + "--" + e.email + "--" + e.password1);
          alert('Ocurrio un error'); 
        }
      )
  }

}
