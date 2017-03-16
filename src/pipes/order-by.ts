import { Injectable, Pipe } from '@angular/core';
import * as _ from 'lodash';

@Pipe({
  name: 'orderBy'
})
@Injectable()
export class OrderByPipe {
  
  transform(itemList, sortByFieldsList) {
    return _.orderBy(itemList, sortByFieldsList, ['asc'])
  }
}
