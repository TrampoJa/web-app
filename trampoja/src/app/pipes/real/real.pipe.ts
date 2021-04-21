import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'real'
})
export class RealPipe implements PipeTransform {
  result: string;

  transform(valor: string): string {
    if (valor) {
      return this.result = "R$" + valor + ",00"
    }
  }

}
