import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators } from "@angular/forms";
import {Router} from "@angular/router";
import {AuthService} from "../services/auth.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup
  submitted = false;
  errorMessage = '';
  isLoggedin = false;
  isLoginFailed = false;
  constructor(private authHttp:AuthService, private router: Router) { }

  ngOnInit(): void {
    this.loginForm = new FormGroup({
      name: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required),
      });
  }

  onSubmit(){
    this.submitted = true;
    this.authHttp.login(this.loginForm.value.name, this.loginForm.value.password).subscribe(
      data=>{
        this.isLoggedin = true
        this.router.navigate(['/']);
      },
      error=>{
        console.log(error);
        this.errorMessage = error;
        this.isLoggedin = false;
        this.isLoginFailed = true;
      }
    );
  }

}
