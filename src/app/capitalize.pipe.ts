import { Pipe, PipeTransform } from '@angular/core';
import { ValueConverter } from '@angular/compiler/src/render3/view/template';

@Pipe({
  name: 'capitalize'
})
export class CapitalizePipe implements PipeTransform {

  transform(value: string, ...args: unknown[]): unknown {
    let firstChar = value.substring(0,1);
    let otherChar =  value.substring(1,value.length);

    let newChar =  firstChar.toUpperCase() + otherChar.toLowerCase();
  
    return newChar; 
    
  }

}
