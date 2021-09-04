import { Component, OnInit } from '@angular/core';
import { Confirmado } from '../confirmado';
import { ConfirmadoService } from '../confirmado.service';
import { UserService } from '../../../app/users/user.service';

@Component({
  selector: 'app-confirmados',
  templateUrl: './confirmados.component.html',
  styleUrls: ['./confirmados.component.css']
})
export class ConfirmadosComponent implements OnInit {
  confirmados: Confirmado[];
  oferta: number;
  owner: number;
  freelancer: number;
  confirmado: number;
  group  = this.userService.groupValue?.group;
  habilitarAvaliacao = false;
  habilitarCancelamento = false;
  habilitarReporte = false;

  constructor(
    private userService: UserService,
    private service: ConfirmadoService,
  ) { }

  ngOnInit(): void {
    this.userService.profile().subscribe(
      (user) => {
        this.group = user.group ? user.group : this.group;
        if (this.group == "Freelancer") {
          this.listF();
        }
        else {
          this.listE();
        }
      }
    );
    return;
  }

  listE(): void {
    this.service.listE()
      .subscribe(confirmados => (this.confirmados = confirmados));
    return;
  }

  listF(): void {
    this.service.listF()
      .subscribe(confirmados => (this.confirmados = confirmados));
    return;
  }

  avaliar(oferta: number, owner: number): void {
    this.habilitarAvaliacao = true;
    this.oferta = oferta;
    this.owner = owner;

    this.escurecer();
  }

  cancelar(oferta: number, freelancer: number, confirmado: number): void {
    this.habilitarCancelamento = true;
    this.oferta = oferta;
    this.freelancer = freelancer;
    this.confirmado = confirmado;

    this.escurecer();
  }

  reportar(freelancer: number, oferta: number): void {
    this.habilitarReporte = true;
    this.freelancer = freelancer;
    this.oferta = oferta;

    this.escurecer();
  }

  escurecer() {
    let container = document.getElementById('container-confirmados');
    container.style.opacity = '0.2';
  }
}
