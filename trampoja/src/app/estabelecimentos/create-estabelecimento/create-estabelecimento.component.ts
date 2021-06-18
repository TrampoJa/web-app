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

  cnpjIsValid = true;
  tipoIsValid = true;

  errorMessage: string;

  step = 0;

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

  next(): void {
    if (this.validators())
      this.step = 1;
    return;
  }

  findCNPJ(): void {
    this.service.findCNPJ(this.model['cnpj']).subscribe(
      (data) => {
        if (this.validatorCNPJ(data)) {
          this.cnpjIsValid = true;
          this.populateCampos(data);
        }
      })
  }

  validatorCNPJ(data: object): boolean {
    if (data['message']) {
      this.errorMessage = 'CNPJ inválido';
      this.cnpjIsValid = false;
      return false;
    }

    if (data['descricao_situacao_cadastral'] != 'Ativa') {
      this.errorMessage = 'A situação cadastral precisa constar como ativa';
      this.cnpjIsValid = false;
      return false;
    }

    if (data['municipio'] != 'CHAPECO') {
      this.errorMessage = 'Sua empresa precisa ser de Chapecó-SC';
      this.cnpjIsValid = false;
      return false;
    }

    return true;
  }

  populateCampos(data: Object): void {
    this.model['razao_social'] = data['razao_social'];
    this.model['nome'] = data['nome_fantasia'];
    this.model['telefone'] = data['ddd_telefone_1'].replace(/ /g,"");
    this.enderecoModel['bairro'] = data['bairro'];
    this.enderecoModel['rua'] = data['logradouro'];
    this.enderecoModel['numero'] = data['numero'];
    this.enderecoModel['complemento'] = data['complemento'];
  }

  submit(): void {
    if (this.validators())
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

  validators(): boolean {
    if (this.model.tipo == '') {
      this.tipoIsValid = false;
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
