import { Component, OnInit } from '@angular/core';
import { DashboardInterface } from 'src/app/models/dashboard-interface';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { UserInterface } from 'src/app/models/user-interface';
import { DataApiService } from 'src/app/services/data-api.service';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {
  dashboard: DashboardInterface = {
    id:null,
    testName: null,
    testPate: null,
    testMate: null, 
    delete: false
  };

  id: any;
  editing: boolean = false;
  users: DashboardInterface[];

  constructor(private dataApi: AuthService, private router: Router,
    private activatedRoute: ActivatedRoute, private dataService:DataApiService ) { 
      this.id = this.activatedRoute.snapshot.params['id'];
      if (this.id) {
        this.editing = true;
        this.dataService.getAllTest().subscribe((data: DashboardInterface[])=>{
          this.users=data;
          this.dashboard = this.users.find((m)=>{
            return m.id == this.id});
            console.log(this.dashboard);
        }, 
        error => {        
          console.log(error.error.detail);         
        });
      } else {
        this.editing = false;
      }
    }
   
  ngOnInit() {
    
  }

  saveUser(){
    if(this.editing){
      this.dataApi.update(this.dashboard.id, this.dashboard.testName, this.dashboard.testPate, 
        this.dashboard.testMate).subscribe(data => {
          let token = data.key;        
          alert('Se actualizo correctamente');        
          console.log(data);
          this.router.navigate(['/dashboard'])
        },
        error => {        
          console.log(error.error.detail);
          alert('Ocurrio un error');
        })
    } else{
      this.dataApi.save(this.dashboard.testName, this.dashboard.testPate, 
        this.dashboard.testMate).subscribe(data => {
          let token = data.key;        
          alert('usuario creado');        
          console.log(data);
          this.router.navigate(['/dashboard'])
        },
        error => {        
          console.log(error.error.detail);
          alert('Ocurrio un error');
        })
    }    
  }  
}


