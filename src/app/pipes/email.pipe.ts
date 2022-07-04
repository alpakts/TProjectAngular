import { Pipe, PipeTransform } from '@angular/core';
import { Register } from '../models/register';

@Pipe({
  name: 'email'
})
export class EmailPipe implements PipeTransform {

  transform(value:Register[], filterText: string): Register[] {
    filterText= filterText?filterText.toLocaleLowerCase():""
    return filterText? value.filter((p:Register)=> p.email.toLocaleLowerCase().indexOf(filterText)!==-1) :value;
  }

}
