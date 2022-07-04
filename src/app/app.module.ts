import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule,FormsModule} from "@angular/forms";
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NaviComponent } from './components/navi/navi.component';
import { FormStatusComponent } from './components/form-status/form-status.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { FilterPipe } from './pipes/filter.pipe';
import { ToastrModule } from 'ngx-toastr';
import { FormAddComponent } from './components/form-add/form-add.component';
import { FormComponent } from './components/form/form.component';
import { LoginComponent } from './components/login/login.component';
import { AuthInterceptor } from './interceptors/auth.interceptor';
import { RegisterComponent } from './components/register/register.component';
import { UsersComponent } from './components/users/users.component';
import { StatusPipe } from './pipes/status.pipe';
import { EmailPipe } from './pipes/email.pipe';
import { MyFormsComponent } from './components/my-forms/my-forms.component';
import { RolesComponent } from './components/roles/roles.component';
import { RolePipe } from './pipes/role.pipe';
@NgModule({
  declarations: [
    AppComponent,
    FormComponent,
    NaviComponent,
    FormStatusComponent,
    FilterPipe,
    FormAddComponent,
    LoginComponent,
    RegisterComponent,
    UsersComponent,
    StatusPipe,
    EmailPipe,
    MyFormsComponent,
    RolesComponent,
    RolePipe,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    ToastrModule.forRoot({
      positionClass: 'toast-bottom-right',
    }),
  ],
  providers: [
    {provide:HTTP_INTERCEPTORS,useClass:AuthInterceptor,multi:true}
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
