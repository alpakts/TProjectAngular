import { Component, OnInit, ɵɵqueryRefresh } from '@angular/core';
import { FormGroup,FormControl,FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { loginModel } from 'src/app/models/login-model';
import { FormService } from 'src/app/services/generic.service';
import jwt_decode from 'jwt-decode';
import { NaviComponent } from '../navi/navi.component';
import { Router } from '@angular/router';
import { TimeoutError } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css',],
  
})
export class LoginComponent implements OnInit {

  constructor(private builder:FormBuilder,private service:FormService,private toastr:ToastrService,private route:Router) { }
  loginForm:FormGroup;
  
  ngOnInit(): void {
    this.createLoginForm();
  }
  createLoginForm(){
    this.loginForm=this.builder.group({
      email:["",Validators.required],
      password:["",Validators.required]
    })
  }
  login(){
    if (this.loginForm.valid) {
      let loginModel=Object.assign({},this.loginForm.value)
      this.service.login("https://localhost:5001/api/auth/login",loginModel).subscribe(response=>{
        console.log(response)
        this.toastr.info("Giriş başarılı")
        localStorage.setItem("token",response.data.token)
        let result=jwt_decode(response.data.token)
        let exp=response.data.expiration;
        var results=new Date(exp);
        localStorage.setItem("expiration",results.toString())
        console.log(results)
        // tokenla yönelndirme yap
        console.log(response.data)
        console.log(result)
        window.location.reload();
      },responseError=>{
        this.toastr.error("kullanıcı adı ya da şifre hatalı")}
      )
      
      
    }else{
      this.toastr.error("alanlar boş olamaz")
    }
    
    
  }
}
 