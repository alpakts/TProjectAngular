import { Component, OnInit } from '@angular/core';
import { FormGroup ,FormControl,FormBuilder, Validators} from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { form } from 'src/app/models/form';
import { FormService } from 'src/app/services/generic.service';
import jwt_decode from "jwt-decode";

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {
  dataLoaded=false;
  updateForm:FormGroup;
  form:form[]=[];
  filterText="";
  token:any =localStorage.getItem("token")
  auth:any= jwt_decode<any>(this.token)
  userid=parseInt(this.auth["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier"])
  date:Date=new Date(Date.now())  
  
  constructor(private formService:FormService, private activeRoute:ActivatedRoute,private toaster:ToastrService,private builder:FormBuilder) { }
  
  ngOnInit(): void {
    this.createUpdateForm();
    this.activeRoute.params.subscribe(params=>{
      if (params["statusid"]) {
        this.getFormbyid(params["statusid"])
      }else{
        this.getForms();
      }
    })
  }
  createUpdateForm(){
    this.updateForm = this.builder.group({
      id:[,Validators.required],
      formDesc: ['', Validators.required],
      deviceName: ['', Validators.required],
      phoneNumber: ['', Validators.required],
      formStatus:['',Validators.required],
      formDate:[this.date,Validators.required]
    });
  }
  getForms(){
    this.formService.apiurl="https://localhost:5001/api/forms/getall";
    this.formService.get<form>(this.formService.apiurl).subscribe((response) =>{
      this.form=response.data
      this.dataLoaded=true
    })
  }
  getFormbyid(statusid:number){
    this.formService.apiurl="https://localhost:5001/api/forms/getbystatusid?statusid="+statusid
    this.formService.get<form>(this.formService.apiurl).subscribe((response) =>{
      this.form=response.data
      this.dataLoaded=true
    })
  }
  updateForms(value:form){
    let formModel =Object.assign({},this.updateForm.value);
    console.log(formModel)
    this.formService.updateService(formModel).subscribe(response=>{
      this.toaster.success("Güncellendi")
      this.getForms();
    },responseError =>{
      console.log(responseError.error)

      this.toaster.error("Form Bununamadı")
    })
  }
  deleteForm(value:form){
    console.log(value)
    this.formService.deleteForm(value).subscribe(response=>{
      this.toaster.success("Silindi")
      this.getForms();
    },responseError =>{

      this.toaster.error("Form Bununamadı")
    })
    
  }
  


}
