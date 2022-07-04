import { Pipe, PipeTransform } from '@angular/core';
import { form } from '../models/form';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {

  transform(value:form[], filterText: string): form[] {
    filterText= filterText?filterText.toLocaleLowerCase():""
    return filterText? value.filter((p:form)=> p.deviceName.toLocaleLowerCase().indexOf(filterText)!==-1) :value;
  }
}
