import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'age'
})
export class AgePipe implements PipeTransform {
  date = new Date();
  day = this.date.getDate();
  month = this.date.getMonth();
  year = this.date.getFullYear();

  split: string[];
  dd: number;
  mm: number;
  yyyy: number;

  transform(value: string): string {
    if (value) {
      this.split = value.split("-");
      this.dd = Number(this.split[2]);
      this.mm = Number(this.split[1]);
      this.yyyy = Number(this.split[0]);

      var resultDay = (this.day - this.dd);
      var resultMonth = ((this.month+1) - this.mm);
      var resultYear = (this.year - this.yyyy);

      if (resultMonth < 0) resultYear --;
      if (resultMonth == 0) {
        if (resultDay < 0) resultYear --;
      }

      value = String(resultYear);
      
      return value;
    }
  }

}
