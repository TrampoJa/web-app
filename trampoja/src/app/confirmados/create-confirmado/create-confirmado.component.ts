import { Injectable } from '@angular/core';
import { Component, OnInit, Input } from '@angular/core';
import { ConfirmadoService } from '../confirmado.service';

@Component({
  selector: 'app-create-confirmado',
  templateUrl: './create-confirmado.component.html',
  styleUrls: ['./create-confirmado.component.css']
})
@Injectable()
export class CreateConfirmadoComponent implements OnInit {
  @Input() oferta: number;
  @Input() freelancer: number;

  constructor(
    private service: ConfirmadoService
  ) { }

  ngOnInit(): void {
    return;
  }

  create(): void {
    if (confirm("Deseja mesmo confirmar este trampo?"))
      this.service.create(this.oferta, this.freelancer).subscribe();
    return;
  }
}
