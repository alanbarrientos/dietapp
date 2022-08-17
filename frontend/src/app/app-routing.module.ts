import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {LoginComponent} from "./login/login.component";
import {SingupComponent} from "./singup/singup.component";
import {LandingComponent} from "./landing/landing.component";
import {NotFoundComponent} from "./not-found/not-found.component";
import {RoleUserComponent} from "./role-user/role-user.component";
import {RoleAdminComponent} from "./role-admin/role-admin.component";
import {AuthGuard} from "./auth.guard";
import {LoggedGuard} from "./logged.guard";

const routes: Routes = [
  {path:"", component:LandingComponent},
  {path:"login", component:LoginComponent},
  {path:"singup", component:SingupComponent},
  {path:"role-user", component:RoleUserComponent, canActivate:[LoggedGuard]},
  {path:"role-admin", component:RoleAdminComponent, canActivate: [LoggedGuard,AuthGuard]},
  {path:"**", component:NotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
