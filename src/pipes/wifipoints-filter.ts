import { Injectable, Pipe } from '@angular/core';

@Pipe({
  name: 'WifipointsFilter'
})
@Injectable()
export class WifipointsFilterPipe {
  
  transform(items: any[], listFilter: any):any {
    return items.filter(item => {
      listFilter = listFilter.toLowerCase();
      //console.log("listFilter -> ",listFilter);
      let matchCase = !listFilter || listFilter === "" || (
        (item.ADRECA.toLowerCase().indexOf(listFilter) > -1) 
        || (item.NOM_BARRI.toLowerCase().indexOf(listFilter) > -1) 
        || (item.NOM_DISTRICTE.toLowerCase().indexOf(listFilter) > -1)
      );
      //console.log("matchCase -> ",matchCase);
      return matchCase;
    });
  }
}
