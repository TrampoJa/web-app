import { Component, Input, OnInit } from '@angular/core';
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

  constructor(
    private service: CanceladoService
  ) { }

  ngOnInit(): void {
    return;
  }

  create(): void {
    this.service.create(this.oferta, this.freelancer, this.confirmado, this.model['justificativa'])
      .subscribe(
        (cancelado) => {
          location.reload();
        });
    return;
  }

  onSubmit(): void { this.submitted = true; return; }

  goBack(): void {
    location.reload();
    return;
  }
}
