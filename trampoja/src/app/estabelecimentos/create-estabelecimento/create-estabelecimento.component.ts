import { Component, OnInit } from '@angular/core';

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
    'Eventos'
  ];
  submitted = false;

  cnpjIsValid = true;
  tipoIsValid = true;

  errorMessage: string;

  cnpjInfos = {};

  step = 0;

  constructor(
    private service: EstabelecimentoService,
    private userService: UserService,
    private enderecoService: EnderecoService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.userService.profile().subscribe(
      (user) => {
        this.group = user.group;
        if (this.group == 'Estabelecimento' || this.group == 'Freelancer') {
          this.router.navigate(['meus-trampos/']);
        }
      }
    );
  }

  next(): void {
    if (this.validatorCNPJ(this.cnpjInfos) && this.validators())
      this.step = 1;
    return;
  }

  findCNPJ(): void {
    this.service.findCNPJ(this.model['cnpj']).subscribe(
      (data) => {
        this.cnpjInfos = data
        if (this.validatorCNPJ(this.cnpjInfos)) {
          this.cnpjIsValid = true;
          this.populateCampos(this.cnpjInfos);
        }
      })
  }

  validatorCNPJ(cnpjInfos: object): boolean {
    if (cnpjInfos['message']) {
      this.errorMessage = 'CNPJ inválido';
      this.cnpjIsValid = false;
      return false;
    }

    if (cnpjInfos['descricao_situacao_cadastral'] != 'Ativa') {
      this.errorMessage = 'A situação cadastral precisa constar como ativa';
      this.cnpjIsValid = false;
      return false;
    }

    if (cnpjInfos['municipio'] != 'CHAPECO') {
      this.errorMessage = 'Sua empresa precisa ser de Chapecó-SC';
      this.cnpjIsValid = false;
      return false;
    }

    return true;
  }

  populateCampos(cnpjInfos: Object): void {
    this.model['razao_social'] = cnpjInfos['razao_social'];
    this.model['nome'] = cnpjInfos['nome_fantasia'];
    this.model['telefone'] = cnpjInfos['ddd_telefone_1'].replace(/ /g,"");
    this.enderecoModel['bairro'] = cnpjInfos['bairro'];
    this.enderecoModel['rua'] = cnpjInfos['logradouro'];
    this.enderecoModel['numero'] = cnpjInfos['numero'];
    this.enderecoModel['complemento'] = cnpjInfos['complemento'];
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
    else
      this.tipoIsValid = true;

    return true;
  }

  onSubmit(): void { this.submitted = true; return; }

  goBack(): void {
    this.step = 0;
    return;
  } 
}
