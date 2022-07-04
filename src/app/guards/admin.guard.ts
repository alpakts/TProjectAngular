import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import jwt_decode from 'jwt-decode'
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {
  constructor(private toaster:ToastrService,private router:Router){}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if (localStorage.getItem("token")) {
      const token:any=localStorage.getItem("token");
      const decodedToken:any=jwt_decode(token);
      if (decodedToken["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"]=="admin") {
        return true
      }else{
        this.toaster.warning("Bu işlemi yapmaya yetkiniz yok")
        return false;
      }
    }else{
      this.toaster.warning("giriş yapınız")
      return false;
    }
      
    
    
  }
  
}
