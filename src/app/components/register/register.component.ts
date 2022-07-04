import { Component, OnInit } from '@angular/core';
import { FormGroup,Validators,FormControl,FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { FormService } from 'src/app/services/generic.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  registerForm:FormGroup
  constructor(private builder:FormBuilder,private service:FormService,private toaster:ToastrService,private router:Router) { }

  ngOnInit(): void {
    this.createRegisterForm();
  }
  createRegisterForm(){
    this.registerForm=this.builder.group({
      email:["",Validators.required],
      password:["",Validators.required],
      firstName:["",Validators.required],
      formId:[5],
      lastName:["",Validators.required],

    })
    
  }
  register(){
    if (this.registerForm.valid){
      let formModel =Object.assign({},this.registerForm.value);
      this.service.register(formModel).subscribe(response=>{
        this.toaster.success("Kayıt Başarılı")
        this.router.navigate(["login"])
      },responseError =>{
        console.log(responseError.error)
        this.toaster.error("Kayıt Başarısız")
      })  }else{
        this.toaster.error("lütfen bilgilerinizi tam giriniz")
      }

  }

}
