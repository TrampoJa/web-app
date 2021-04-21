import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';

import { Estabelecimento } from '../estabelecimento';
import { EstabelecimentoService } from '../estabelecimento.service';

import { Endereco } from '../../enderecos/endereco';
import { EnderecoService } from '../../enderecos/endereco.service';
import { AppService } from 'src/app/app.service';

@Component({
  selector: 'app-create-estabelecimento',
  templateUrl: './create-estabelecimento.component.html',
  styleUrls: ['./create-estabelecimento.component.css']
})
export class CreateEstabelecimentoComponent implements OnInit {
  estabelecimento: Estabelecimento;
  endereco: Endereco;
  model = {
    'nome': '',
    'cpf_cnpj': '',
    'razao_social': '',
    'tipo': '',
    'telefone': '',
    'logo': ''
  };
  enderecoModel = {
    'estado': '',
    'cidade': '',
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
    private appService: AppService,
    private enderecoService: EnderecoService,
    private location: Location,
  ) { }

  ngOnInit(): void {
    this.appService.getService().subscribe();
    return;
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
          this.estabelecimento = estabelecimento;
          if (Object.keys(estabelecimento).length === 0 
                && estabelecimento.constructor === Object) {
            location.reload();
          }
          else {
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
