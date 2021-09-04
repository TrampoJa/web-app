import { Component, Input, Output, OnInit, EventEmitter } from '@angular/core';
import { CanceladoService } from '../cancelado.service';
import { Cancelado } from '../cancelado';

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
            this.close();
        }
      );
  }

  onSubmit(): void { this.submitted = true; return; }

  close(): void {
    let container = document.getElementById('container-confirmados');
    container.style.opacity = '1';

    this.habilitarCancelamento = false;
    this.habilitarCancelamentoChange.emit(this.habilitarCancelamento)
    return;
  }
}
