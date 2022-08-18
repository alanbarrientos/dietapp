import { Component, OnInit } from '@angular/core';
import {FormArray, FormControl, FormGroup, Validators} from "@angular/forms";
import { User } from '../models/user.model';
import {AuthService} from "../services/auth.service";

@Component({
  selector: 'app-singup',
  templateUrl: './singup.component.html',
  styleUrls: ['./singup.component.css']
})
export class SingupComponent implements OnInit {
  roles = [
    {name:'User', id:1, selected: true},
    {name:'Admin', id:2, selected: false},
  ]
  signupForm!:FormGroup;
  user = new User('', '', '', false);
  isRegistered = false;
  submitted = false;
  errorMessage = '';
  constructor(private authHttp: AuthService) { }

  ngOnInit(): void {
    this.signupForm = new FormGroup({
      name: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, Validators.minLength(8)]),
      gender: new FormControl('', [Validators.required]),
    });
  }
  createRoles(rolesList: any[]): FormArray{
    const arr = rolesList.map(role => {
      return new FormControl(role.selected)
    });
    return new FormArray(arr);
  }

  onSubmit(){
    this.submitted = true;
    this.user.userName = this.signupForm.value.name;
    this.user.email = this.signupForm.value.email;
    this.user.password = this.signupForm.value.password;
    if(this.signupForm.value.gender.toLowerCase() == 'male'){
    this.user.isMale=true;
    }
    console.log(this.user);
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
