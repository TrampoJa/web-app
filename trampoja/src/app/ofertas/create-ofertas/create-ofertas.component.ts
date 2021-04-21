import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';

import { Oferta } from '../oferta';
import { OfertaService } from '../oferta.service';
import { UserService } from 'src/app/users/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-ofertas',
  templateUrl: './create-ofertas.component.html',
  styleUrls: ['./create-ofertas.component.css']
})
export class CreateOfertasComponent implements OnInit {
  oferta: Oferta;
  group: String;
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
    'Cozinha'
  ];
  submitted = false;

  valorIsValid = true;

  constructor(
    private service: OfertaService,
    private userService: UserService,
    private location: Location,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.userService.profile().subscribe(
      (user) => {
        this.group = user.last_name;
        if (this.group != 'Estabelecimento') {
          this.router.navigate(['novo-estabelecimento/']);
        }
      }
    );
    return;
  }

  submit(): void {
    if (this.validators()) {
      this.create();
    }
    return;
  }

  create(): void {   
    this.service.create(this.model)
      .subscribe();
    return;
  }

  validators(): boolean {
    let cont = 0;

    if (Number(this.model.valor) < 10) {
      this.valorIsValid = !this.valorIsValid;
      cont++;
    }
    if (cont != 0) {
      return false;
    }
    return true;
  }

  onSubmit(): void { this.submitted = true; return; }

  goBack(): void {
    this.location.back();
    return;
  }
}
