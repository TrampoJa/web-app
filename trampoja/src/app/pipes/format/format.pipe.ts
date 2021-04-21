import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'format'
})
export class FormatPipe implements PipeTransform {
  avaliacao: number;

  transform(value: number): number {
    if (value) {
      this.avaliacao = parseFloat(value.toFixed(1));
      return this.avaliacao;
    }
  }
}
