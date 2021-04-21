import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'fone'
})
export class FonePipe implements PipeTransform {
  split: string[];
  ddd: string;
  number: string;
  result: string;
  i: number;

  transform(fone?: string): string {
    if (fone){
      this.i = 2;
      this.number = "";

      this.split = fone.split("", 2);
      this.ddd = this.split[0] + this.split[1];
      
      this.split = fone.split("")
      while (this.split.length > this.i) {
        this.number += this.split[this.i];
        this.i ++;
      }
      if (fone.length == 11) {
        this.split = this.number.split("", 5);
      }
      else {
        this.split = this.number.split("", 4);
      }
      this.split.push("-");
      this.i = 0;
      this.number = "";
      while (this.split.length > this.i) {
        this.number += this.split[this.i];
        this.i ++;
      }
      this.split = fone.split("");
      if (fone.length == 11) {
        this.i = 7;
      }
      else {
        this.i = 6;
      }
      while (this.split.length > this.i) {
        this.number += this.split[this.i];
        this.i ++;
      }
      this.result = "(" + this.ddd + ")" + " " + this.number;
      return this.result;
    }
  }
}
