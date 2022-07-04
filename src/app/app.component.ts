import { Component, OnInit, ɵɵqueryRefresh } from '@angular/core';
import axios from 'axios';
import jwt_decode from "jwt-decode";
import * as moment from 'moment';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'TProjectAngular';
  ngOnInit(): void {
    this.getExpDate();
  }
  getExpDate(){
    
    var result=localStorage.getItem("expiration")
     var endtime=moment(result);
     var time=moment(Date.now());
     console.log(time);
     console.log(endtime)
    if (endtime.isBefore(time)) {
      localStorage.removeItem("token")
      localStorage.removeItem("expiration")
      
    }else{
      
    }
  }

}
