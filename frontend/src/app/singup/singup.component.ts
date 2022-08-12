import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import { User } from '../models/user.model';
import {AuthService} from "../services/auth.service";

@Component({
  selector: 'app-singup',
  templateUrl: './singup.component.html',
  styleUrls: ['./singup.component.css']
})
export class SingupComponent implements OnInit {
  singupForm!:FormGroup;
  user = new User('', '', '');
  isRegistered = false;
  submitted = false;
  errorMessage = '';
  constructor(private authHttp: AuthService) { }

  ngOnInit(): void {
    this.singupForm = new FormGroup({
      name: new FormControl('', [Validators.required, Validators.minLength(5), Validators.maxLength(20)]),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, Validators.minLength(8)])
    });
  }

  onSubmit(){
    this.submitted = true;
    this.user.userName = this.singupForm.value.userName;
    this.user.email = this.singupForm.value.email;
    this.user.password = this.singupForm.value.password;
    this.registerUser();
  }

  registerUser(){
    this.authHttp.signup(this.user)
      .subscribe(user=> {
        console.log(user);
        this.isRegistered = true;
      }, error=> {
        console.log(error);
        this.errorMessage = error;
        this.isRegistered = false;
      });
  }
}
