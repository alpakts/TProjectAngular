import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { FormService } from 'src/app/services/generic.service';
import jwt_decode from 'jwt-decode';

@Component({
  selector: 'app-navi',
  templateUrl: './navi.component.html',
  styleUrls: ['./navi.component.css'],
})
export class NaviComponent implements OnInit {
  item: number;
  constructor(
    private router: Router,
    private toaster: ToastrService,
    private service: FormService
  ) {}

  ngOnInit(): void {
    this.loginController();
  }
  logOut() {
    this.router.navigate(['user']);
    localStorage.removeItem('token');

    this.toaster.info('çıkış başarılı');
    window.location.reload()
  }
  loginController() {
    if (localStorage.getItem('token')) {
      const token: any = localStorage.getItem('token');
      const decodedToken: any = jwt_decode(token);
      switch (
        decodedToken[
          'http://schemas.microsoft.com/ws/2008/06/identity/claims/role'
        ]
      ) {
        case 'admin':
          this.item = 1;
          return this.item;

        case 'user':
          this.item = 2;
          return this.item;
        default:
          return this.item=2
      }
    } else {
      return (this.item = 3);
    }
  }
}
