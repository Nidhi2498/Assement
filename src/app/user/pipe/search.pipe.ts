import { Pipe, PipeTransform } from '@angular/core';
import { User } from '../user.model';

@Pipe({
  name: 'searchClientname'
})
export class SearchPipe implements PipeTransform {

    //Custom pipe for searching Client name
    transform(value: any, searchTerm: any): any {
      
      return value.filter(function(search:User){
        return search.clientname.toLowerCase().includes(searchTerm.toLowerCase());
      })
    }

}
