import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';
import { genericResponseModel } from '../models/generic-response-model';
import { form } from '../models/form';
import { responseModel } from '../models/response-mode';
import { loginModel } from '../models/login-model';
import { tokenModel } from '../models/token-model';
import { singleResponseModel } from '../models/single-response-model';
import jwt_decode from 'jwt-decode';
import { Register } from '../models/register';
import { Role } from '../models/role';

@Injectable({
  providedIn: 'root',
})
export class FormService{
  apiurl=""
  constructor(private httpClient: HttpClient) {}
  get<T>(apiurl:string): Observable<genericResponseModel<T>> {
    return this.httpClient.get<genericResponseModel<T>>(apiurl);
  }
  add(form:form){
    const token = localStorage.getItem("token");
    
    
    console.log(token);
    const data = {
      formDesc: form.formDesc,
      formDate: form.formDate,
      deviceName: form.deviceName,
      formCode: 5,
      userId: form.userId, 
      formStatus: form.formStatus,
      formImageId: form.formImageId,
      phoneNumber: form.phoneNumber.toString(),
    }
    
    return this.httpClient.post<responseModel>("https://localhost:5001/api/forms/add",data)
  }
  login(apiurl:string,T:string){
     return this.httpClient.post<singleResponseModel<tokenModel>>(apiurl,T)
  }
  isAuth(){
    if (localStorage.getItem("token")) {
      const token:any =localStorage.getItem("token")
      const auth= jwt_decode<any>(token)
      switch (token["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"]) {
        case "user":
          return true

        case "admin":
          
          return true;
          
        
        default:
          false
      }

      



      return true;

    }else{
      return false;
    }
  }
  deleteForm(value:form){
    console.log("başarılı")
    return this.httpClient.post<any>("https://localhost:5001/api/forms/delete",value);
  }
  deleteUser(value:Register){
    return this.httpClient.post<any>("https://localhost:5001/api/users/delete",value)
  }
  updateService(value:form){
    localStorage.setItem("formId",value.id.toString())
    const data = {
      id :value.id,
      formDesc: value.formDesc,
      formDate: value.formDate,
      deviceName: value.deviceName,
      formCode: 5,
      formStatus: value.formStatus,
      formImageId: value.formImageId,
      phoneNumber: value.phoneNumber,
    }
    console.log(data)
    return this.httpClient.post<any>("https://localhost:5001/api/forms/update",data);
  }
  register(value:Register){
    const data ={
      id :  value.id,
      email: value.email,
      firstName: value.firstName,
      lastName: value.lastName,
      password: value.password, 
    }
    return this.httpClient.post<any>("https://localhost:5001/api/auth/register",data)
  }
  updateUser(value:Register){
    const data = {
      id :  value.id,
      email: value.email,
      firstName: value.firstName,
      lastName: value.lastName,
      password: value.password
    }
    console.log(data)
    return this.httpClient.post<any>("https://localhost:5001/api/users/update",data);
  }
  getByUserId():Observable<genericResponseModel<form>>{
    const token:any=localStorage.getItem("token");
    const decodedToken:any=jwt_decode(token);
    const userid=decodedToken["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier"]
    return this.httpClient.get<genericResponseModel<form>>("https://localhost:5001/api/forms/getallbyuserid?userId="+userid)
  }
  getRoles(){
     return this.httpClient.get("https://localhost:5001/api/userclaim/getall");
  }
  addRoles(value:Role){
    const data={
      operationClaimId:value.operationClaimId,
      userId:value.userId
    }
     return this.httpClient.post("https://localhost:5001/api/userclaim/add",data)
  }
  updateRoles(value:Role){
    const data={
      operationClaimId:value.operationClaimId,
      userId:value.userId
    }
     return this.httpClient.post("https://localhost:5001/api/userclaim/update",data)
  }deleteRoles(value:Role){
    return this.httpClient.post("https://localhost:5001/api/userclaim/delete",value);
  }
  
 
  }
  

