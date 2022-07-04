import { Component, OnInit } from '@angular/core';
import { FormGroup ,Validators,FormControl,FormBuilder} from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Role } from 'src/app/models/role';
import { FormService } from 'src/app/services/generic.service';

@Component({
  selector: '.app-users',
  templateUrl: './roles.component.html',
  styleUrls: ['./roles.component.css']
})
export class RolesComponent implements OnInit {
  role:Role[]=[];
  roleForm:FormGroup;
  dataLoaded=false;
  
  constructor(private service:FormService,private toaster:ToastrService,private builder:FormBuilder) { }

  ngOnInit(): void {
    this.get();
    this.createRoleForm();
  }
  createRoleForm(){
    this.roleForm=this.builder.group({
      id:[""],
      userId:["",Validators.required],
      operationClaimId:["",Validators.required]
    })
  }
  get(){
    this.service.get<Role>("https://localhost:5001/api/userclaim/getall").subscribe(response=>{
      this.role=response.data
      this.dataLoaded=true
      
      
    })
  }
  update(value:Role){
    console.log(value.userId)
    var result=this.getUniq(value.id)
    if (result) {
      if (this.roleForm.valid) {
        let formmodel=Object.assign({},this.roleForm.value);
        this.service.updateRoles(formmodel).subscribe(response=>{
          this.toaster.success("güncellendi")
          this.get()
          
        },responseError=>{
          this.toaster.error("form hatalı")
        })
      
      }else{
        this.toaster.warning("formunuz eksik")
      }
      
    } 
    }
    
  add(){
    if (this.roleForm.valid) {
      let formmodel=Object.assign({},this.roleForm.value);
      this.service.addRoles(formmodel).subscribe(response=>{
        this.toaster.success("Rol Eklendi")
        this.get();
        console.log(formmodel.userId)
      },responseError=>{
        this.toaster.error("eklenemedi")
      })
    }else{
      this.toaster.error("form eksik")
    }
  }
  delete(value:Role){
    console.log(value)
    this.service.deleteRoles(value).subscribe(response=>{
      this.toaster.success("Silindi")
      this.get();
    },responseError =>{

      this.toaster.error("Rol Bununamadı")
    })
    
  }
  getUniq(id:any):any{
    let xml:any;
    var result=this.role
    for (let index = 0; index < this.role.length; index++) {
      const element = this.role[index];
      if (element.userId==id) {
        xml=false
           
      }else{
        xml=true 
        
      }
      
      if (xml) {
        
      }
 

    
  }

  }
}
