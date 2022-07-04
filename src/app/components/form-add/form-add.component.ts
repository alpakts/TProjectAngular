import { Component, OnInit } from '@angular/core';
import {FormBuilder, Validators} from "@angular/forms"
import { FormControl, FormGroup } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { filter, observable } from 'rxjs';
import { form } from 'src/app/models/form';
import { FormService } from 'src/app/services/generic.service';
import jwt_decode from "jwt-decode";
import { __spreadArrays } from 'tslib';

@Component({
  selector: 'app-form-add',
  templateUrl: './form-add.component.html',
  styleUrls: ['./form-add.component.css'],
})
export class FormAddComponent implements OnInit {
  userid:any;
  date:Date=new Date(Date.now())
  addForm:FormGroup;


  
  constructor(private formBuilder: FormBuilder,private service :FormService,private toaster:ToastrService) {}
  
  ngOnInit(): void  { 
    if (localStorage.getItem("token")) {
      const token:any=localStorage.getItem("token");
      const decodedtoken:any=jwt_decode(token);
      console.log(decodedtoken)
      this.userid=decodedtoken["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier"]
    }else{
      this.userid=0;
    }
    this.createFormAddForm()
     
  }
  createFormAddForm() {
    // console.log('jwt_decode', userId.email)
    this.addForm = this.formBuilder.group({
      formDesc: ['', Validators.required,],
      deviceName: ['', Validators.required],
      phoneNumber: ['', Validators.required],
      formStatus:["",Validators.required],
      formDate:[this.date,Validators.required],
      userId:[this.userid]
      
      
      
    });
  }
  add(){
    localStorage.setItem("formId",this.addForm.value.formId)
    
     if (this.addForm.valid){
      let formModel =Object.assign({},this.addForm.value);
      this.service.add(formModel).subscribe(response=>{
        this.toaster.success("Form Gönderildi")
      },responseError =>{
        console.log(responseError.error)
        this.toaster.error("Form Hatalı")
      })

    
      
    }
    else{
      this.toaster.error("Formunuz Eksik")
    }
    
    
  }

  
}
