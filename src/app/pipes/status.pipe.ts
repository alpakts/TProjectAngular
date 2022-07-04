import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'status'
})
export class StatusPipe implements PipeTransform {

  transform(value: number, ...args: unknown[]): unknown {
    if(value==1){
      return  "aktif"
    }else{
      return "pasif"
    }

  }

}
