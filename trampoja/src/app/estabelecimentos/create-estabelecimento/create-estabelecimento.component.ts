import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';

import { Estabelecimento } from '../estabelecimento';
import { EstabelecimentoService } from '../estabelecimento.service';

import { Endereco } from '../../enderecos/endereco';
import { EnderecoService } from '../../enderecos/endereco.service';
import { UserService } from 'src/app/users/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-estabelecimento',
  templateUrl: './create-estabelecimento.component.html',
  styleUrls: ['./create-estabelecimento.component.css']
})
export class CreateEstabelecimentoComponent implements OnInit {
  estabelecimento: Estabelecimento;
  endereco: Endereco;
  group: String;
  model = {
    'nome': '',
    'cnpj': '',
    'razao_social': '',
    'tipo': '',
    'telefone': '',
    'logo': ''
  };
  enderecoModel = {
    'estado': 'SC',
    'cidade': 'Chapecó',
    'bairro': '',
    'rua': '',
    'numero': '',
    'complemento': ''
  };
  estadoOptions = [
    'SC'
  ];
  cidadeOptions = [
    'Chapecó'
  ];
  tipos = [
    'Bar',
    'Restaurante',
    'Pizzaria',
  ];
  submitted = false;

  constructor(
    private service: EstabelecimentoService,
    private userService: UserService,
    private enderecoService: EnderecoService,
    private location: Location,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.userService.profile().subscribe(
      (user) => {
        this.group = user.last_name;
        if (this.group == 'Estabelecimento' || this.group == 'Freelancer') {
          this.router.navigate(['meus-trampos/']);
        }
      }
    );
  }

  submit(): void {
    this.create();
    return;
  }

  create(): void {
    delete this.model.logo;
    this.service.create(this.model)
      .subscribe(
        (estabelecimento) => {
          if (!(Object.keys(estabelecimento).length === 0 
                && estabelecimento.constructor === Object)) {
            this.estabelecimento = estabelecimento;
            this.createEndereco();
          }
        });
    return;
  }

  createEndereco(): void {  
    this.enderecoService.create(this.enderecoModel)
      .subscribe(endereco => (this.endereco = endereco));
    return;
  }

  onSubmit(): void { this.submitted = true; return; }

  goBack(): void {
    this.location.back();
    return;
  } 
}
