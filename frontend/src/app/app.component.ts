import { Component } from '@angular/core';
import {Router} from "@angular/router";
import {AuthService} from "./services/auth.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(private router:Router, private http:AuthService) {
  }
  logout(){
    console.log('Se supone que aprete logout')
    localStorage.clear();
    this.router.navigate(['/login']);
    this.http.logout().subscribe(
      data=>{
        },
      error=>{
        console.log(error);
      })

  }
}
