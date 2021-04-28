import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'searchByName'
})
export class SearchByNamePipe implements PipeTransform {

  transform(value: any, arg: any): any {    
    if (arg === '' || arg.length < 2) return value;
    const resultPosts = [];
    for (const post of value) {
      if (post.nombres.toLowerCase().indexOf(arg.toLowerCase()) > -1) {
        resultPosts.push(post);
      };
    };

    for (const post of value) {
      if (post.apellidoP.toLowerCase().indexOf(arg.toLowerCase()) > -1) {
        resultPosts.push(post);
      };
    };

    for (const post of value) {
      if (post.apellidoM.toLowerCase().indexOf(arg.toLowerCase()) > -1) {
        resultPosts.push(post);
      };
    };
    return resultPosts;
  }

  

}
