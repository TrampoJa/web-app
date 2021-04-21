import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'time'
})
export class TimePipe implements PipeTransform {
  split: string[];
  result: string;

  transform(time?: string): string {
    if (time) {
      this.split = time.split(":")
      this.result = this.split[0] + "h " + this.split[1] + "min";
      return this.result;
    }
  }
}
