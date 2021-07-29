import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'search'
})
export class SearchPipe implements PipeTransform {

  transform(value: any, searchText: any): any {
    return value.filter(function(search:any){
      return search.clientname.indexOf(searchText) > -1;
    })
  }

}
