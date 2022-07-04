import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'role'
})
export class RolePipe implements PipeTransform {

  transform(value:number, ...args: unknown[]): unknown {
    switch(value){
      case 1:
        return ("Kullanıcı");
      case 2:
        return ("Moderatör");
      case 3:
        return ("Admin");
      default:
        return null;
    }
  }

}
