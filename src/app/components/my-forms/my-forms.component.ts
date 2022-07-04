import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { form } from 'src/app/models/form';
import { FormService } from 'src/app/services/generic.service';

@Component({
  selector: 'app-my-forms',
  templateUrl: './my-forms.component.html',
  styleUrls: ['./my-forms.component.css']
})
export class MyFormsComponent implements OnInit {
  form:form[]=[];
  constructor(private service:FormService,private toaster:ToastrService) { }

  ngOnInit(): void {
    this.getFormById();
  }
  getFormById(){
    this.service.getByUserId().subscribe(response=>{
      this.form=response.data;
    },responseError=>{
      this.toaster.error(responseError.error)
    })
  }

}
