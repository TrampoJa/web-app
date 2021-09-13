import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';

import { Oferta } from '../oferta';
import { OfertaService } from '../oferta.service';
import { UserService } from 'src/app/users/user.service';
import { EstabelecimentoService } from 'src/app/estabelecimentos/estabelecimento.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-ofertas',
  templateUrl: './create-ofertas.component.html',
  styleUrls: ['./create-ofertas.component.css']
})
export class CreateOfertasComponent implements OnInit {
  oferta: Oferta;
  group: String;
  ofertas_para_publicar: number;
  model = {
    'nome': '',
    'valor': '',
    'time': '',
    'time_final': '',
    'date_inicial': '',
    'freelancers': '',
    'obs': ''
  };
  options = [
    'Garçom',
    'Cozinha',
    'Caixa',
    'Auxiliar de eventos'
  ];
  submitted = false;

  valorIsValid = true;
  freelancersIsValid = true;
  dateIsValid = true;

  constructor(
    private service: OfertaService,
    private userService: UserService,
    private estabelecimentoService: EstabelecimentoService,
    private location: Location,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.userService.profile().subscribe(
      (user) => {
        this.group = user.group;
        if (this.group != 'Estabelecimento')
          this.router.navigate(['novo-estabelecimento/']);
        else
          this.getOfertasParaPublicar();
      }
    );
    return;
  }

  submit(): void {
    if (this.validators())
      this.create();
    return;
  }

  create(): void {   
    this.service.create(this.model)
      .subscribe();
    return;
  }

  getOfertasParaPublicar(): void {
    this.estabelecimentoService.profile()
      .subscribe(estabelecimento => 
        this.ofertas_para_publicar = estabelecimento.ofertas_para_publicar)
    return;
  }

  validators(): boolean {
    let cont = 0;

    if (this.dataOfertaMenorDataAtual(this.model.date_inicial, this.model.time)) {
      this.dateIsValid = false;
      cont++
    }
    else
      this.dateIsValid = true;

    if (Number(this.model.valor) < 10) {
      this.valorIsValid = false;
      cont++;
    }
    else
      this.valorIsValid = true;

    if (this.ofertas_para_publicar < Number(this.model.freelancers)) {
      this.freelancersIsValid = false;
      cont++;
    }
    else
      this.freelancersIsValid = true;
    
    if (cont != 0) {
      return false;
    }

    return true;
  }

  dataOfertaMenorDataAtual(dateForm: string, timeForm: string): boolean {
    let splitDate = dateForm.split("-");
    let splitTime = timeForm.split(":");

    let ofertaDate = new Date(
      Number(splitDate[0]), Number(splitDate[1])-1, Number(splitDate[2]), 
      Number(splitTime[0]), Number(splitTime[1])
    );

    let date = new Date();

    if (ofertaDate < date)
      return true

    return false;
  }

  onSubmit(): void { this.submitted = true; return; }

  goBack(): void {
    this.location.back();
    return;
  }
}
