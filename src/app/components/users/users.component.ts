import { Component, OnInit, ɵɵqueryRefresh } from '@angular/core';
import { FormGroup,FormControl,Validators,FormBuilder } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Register } from 'src/app/models/register';
import { FormService } from 'src/app/services/generic.service';

@Component({
  
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
  filterText=""
  dataLoaded=false;
  userForm:FormGroup;
  user:Register[]=[];

  constructor(private builder:FormBuilder,private toaster:ToastrService,private service:FormService) { }

  ngOnInit(): void {
    this.getUser();
    this.createUserForm();
  }
  createUserForm(){
    this.userForm=this.builder.group({
      id:["",Validators.required],
      email:["",Validators.required],
      firstName:["",Validators.required],
      lastName:["",Validators.required],
      formId:["",Validators.required],
    })
  }
  updateUser(value:Register){
    if (this.userForm.valid) {
      let formmodel =Object.assign({},this.userForm.value)
    this.service.updateUser(formmodel).subscribe(response=>{
      this.toaster.success("güncellendi")
      this.getUser();
    },responseError=>{
      console.log(responseError)
      this.toaster.error("form hatalı")
    })
    }else{
      this.toaster.error("güncelleme başarısız")
    }
    
    

  }
  getUser(){
    this.service.apiurl="https://localhost:5001/api/users/getall";
    this.service.get<any>(this.service.apiurl).subscribe((response) =>{
      this.user=response.data
      this.dataLoaded=true
    })

  }
  deleteUser(user:Register){
    this.service.deleteUser(user).subscribe(response=>{
      this.toaster.success("silindi")
      ɵɵqueryRefresh
      this.getUser();
    },responseError=>{
      this.toaster.error("form bulunamadı")
    })
    
    
  }
}
