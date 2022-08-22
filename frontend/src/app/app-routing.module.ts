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
import {DashboardComponent} from "./dashboard/dashboard.component";
import {WeightHistoryComponent} from "./weight-history/weight-history.component";
import {AddWeightComponent} from "./add-weight/add-weight.component";
import {ChartWeightComponent} from "./chart-weight/chart-weight.component";

const routes: Routes = [
  {path:"", component:LandingComponent},
  {path:"login", component:LoginComponent},
  {path:"singup", component:SingupComponent},
  {path:"role-user", component:RoleUserComponent, canActivate:[LoggedGuard]},
  {path:"role-admin", component:RoleAdminComponent, canActivate:[LoggedGuard,AuthGuard]},
  {path:"dashboard", component:DashboardComponent, canActivate:[LoggedGuard]},
  {path:"weight-history", component:WeightHistoryComponent, canActivate:[LoggedGuard]},
  {path:"add-weight", component:AddWeightComponent, canActivate:[LoggedGuard]},
  {path:"chart-weight", component:ChartWeightComponent, canActivate:[LoggedGuard]},
  {path:"**", component:NotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
