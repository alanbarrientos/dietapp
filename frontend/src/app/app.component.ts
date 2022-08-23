import {Component, OnChanges, OnInit, SimpleChanges,} from '@angular/core';
import {Router} from "@angular/router";
import {AuthService} from "./services/auth.service";
import {GlobalService} from "./services/islogged.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  login=false;
  constructor(private router:Router, private http:AuthService, private globalSrv: GlobalService) {
  }

  ngOnInit() {
    this.globalSrv.itemValue.subscribe((nextValue) => {
           if(nextValue!=null){
             this.login=true;
           }else{
             this.login=false;
           }
    })
    if(localStorage.getItem('username')!=null){
      this.login=true;
    }
  }

  logout(){
    console.log('Se supone que aprete logout')
    localStorage.clear();
    this.login=false;
    this.router.navigate(['/login']);
    this.http.logout().subscribe(
      data=>{
        },
      error=>{
        console.log(error);
      })

  }
}
