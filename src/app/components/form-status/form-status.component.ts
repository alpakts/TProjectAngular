import { Component, OnInit } from '@angular/core';
import { formstatus } from 'src/app/models/form_status';
import { FormService } from 'src/app/services/generic.service';

@Component({
  selector: 'app-form-status',
  templateUrl: './form-status.component.html',
  styleUrls: ['./form-status.component.css']
})
export class FormStatusComponent implements OnInit {
  currentStatus:formstatus;
  formStatus:formstatus[]=[];
  constructor(private formService:FormService) { }
  

  ngOnInit(): void {
    this.getFormstatus();
  }
  getFormstatus(){
    this.formService.apiurl="https://localhost:5001/api/FormStatus/getall";
    this.formService.get<formstatus>(this.formService.apiurl).subscribe((response) =>{
      this.formStatus=response.data
    })

}
setCurrentStatus(form:formstatus){
  this.currentStatus=form;
}
getCurrentStatus(form:formstatus){
  if (form==this.currentStatus) {
    return "list-group-item active"
  }else{
    return "list-group-item"
  }
}
getAllForms(){
  if (!this.currentStatus) { 
    
    return "list-group-item active"
  }else{
    
    return "list-group-item"
  }
}
}
