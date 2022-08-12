import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {LoginComponent} from "./login/login.component";
import {SingupComponent} from "./singup/singup.component";
import {LandingComponent} from "./landing/landing.component";
import {NotFoundComponent} from "./not-found/not-found.component";

const routes: Routes = [
  {path:"", component:LandingComponent},
  {path:"login", component:LoginComponent},
  {path:"singup", component:SingupComponent},
  {path:"**", component:NotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
