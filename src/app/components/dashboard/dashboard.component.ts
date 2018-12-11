import { Component, OnInit, ComponentRef } from '@angular/core';
import { DataApiService } from 'src/app/services/data-api.service';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { DashboardInterface } from '../../models/dashboard-interface';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { UserInterface } from 'src/app/models/user-interface';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  public data:any = []
  constructor(private dataApiService: DataApiService, private autService: AuthService,
     private router: Router, private authService: AuthService, private http:HttpClient) { 
      
     }

  private dash: DashboardInterface = {
    id:'',
    testName:'',
    testPate:'',
    testMate:'',
    delete:false,
  }
  ngOnInit() {
    return this.dataApiService.getAllTest()
    .subscribe(data =>{
      this.data = data;
    },
    error => {
      console.log(error.error.detail);
    })   
  }
  deleteUser(id:string){
    this.autService.delete(id).subscribe(data => {
        let token = data.key;         
        alert('Se Elimino correctamente');        
        console.log(data);        
        this.dataApiService.getAllTest()
        .subscribe(data =>{
          this.data = data;
        },
        error => {
          console.log(error.error.detail);
        })   
      },
      error => {        
        console.log(error.error.detail);
        alert('Ocurrio error al eliminar');
      })
  }   
     
}
