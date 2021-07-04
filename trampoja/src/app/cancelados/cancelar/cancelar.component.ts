import { Component, Input, Output, OnInit, EventEmitter } from '@angular/core';
import { CanceladoService } from '../cancelado.service';
import { Cancelado } from '../cancelado';
import { ConfirmadosComponent } from 'src/app/confirmados/confirmados/confirmados.component';

@Component({
  selector: 'app-cancelar',
  templateUrl: './cancelar.component.html',
  styleUrls: ['./cancelar.component.css']
})
export class CancelarComponent implements OnInit {
  cancelado: Cancelado
  submitted = false;
  model = {'justificativa': ''};

  @Input() oferta: number;
  @Input() freelancer: number;
  @Input() confirmado: number;
  @Input() habilitarCancelamento: boolean;
  @Output() habilitarCancelamentoChange = new EventEmitter<boolean>();

  constructor(
    private service: CanceladoService,
    private confirmadoComponent: ConfirmadosComponent
  ) { }

  ngOnInit(): void {
    return;
  }

  create(): void {
    this.service.create(this.oferta, this.freelancer, this.confirmado, this.model['justificativa'])
      .subscribe(
        (cancelado) => {
          if (!(Object.keys(cancelado).length === 0 
                && cancelado.constructor === Object))
            location.reload();
          
          else
            this.goBack();
        }
      );
  }

  onSubmit(): void { this.submitted = true; return; }

  goBack(): void {
    this.habilitarCancelamento = false;
    this.habilitarCancelamentoChange.emit(this.habilitarCancelamento)
    return;
  }
}
