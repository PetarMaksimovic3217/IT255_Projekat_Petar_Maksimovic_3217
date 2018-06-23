import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'searchDestination'
})
export class SearchDestinationPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    if(!args)
      return value;
     return value.filter(item=>item.ime.indexOf(args) !== -1);
  }

}
