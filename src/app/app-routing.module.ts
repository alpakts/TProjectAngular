import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormAddComponent } from './components/form-add/form-add.component';
import { FormStatusComponent } from './components/form-status/form-status.component';
import { FormComponent } from './components/form/form.component';
import { LoginComponent } from './components/login/login.component';
import { MyFormsComponent } from './components/my-forms/my-forms.component';
import { RegisterComponent } from './components/register/register.component';
import { RolesComponent } from './components/roles/roles.component';
import { UsersComponent } from './components/users/users.component';
import { AdminGuard } from './guards/admin.guard';
import { LoginGuard } from './guards/login.guard';

const routes: Routes = [
  {path:"",pathMatch:"full",component:FormAddComponent},
  {path:"formstatus",component:FormStatusComponent,canActivate:[AdminGuard]},
  {path:"forms",component:FormComponent,canActivate:[AdminGuard]},
  {path:"forms/status/:statusid",component:FormComponent,canActivate:[AdminGuard]},
  {path:"forms/formadd",component:FormAddComponent},
  {path:"login",component:LoginComponent},
  {path:"register",component:RegisterComponent},
  {path:"user",component:UsersComponent,canActivate:[AdminGuard]},
  {path:"formAdd",component:FormAddComponent,canActivate:[LoginGuard]},
  {path:"myforms",component:MyFormsComponent,canActivate:[LoginGuard]},
  {path:"role",component:RolesComponent,canActivate:[AdminGuard]},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

