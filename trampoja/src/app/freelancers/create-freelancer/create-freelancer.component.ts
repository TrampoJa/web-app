import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';

import { Freelancer } from '../freelancer';
import { FreelancerService } from '../freelancer.service';
import { User } from 'src/app/users/user';

import { Endereco } from '../../enderecos/endereco';
import { EnderecoService } from '../../enderecos/endereco.service'; 
import { UserService } from 'src/app/users/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-freelancer',
  templateUrl: './create-freelancer.component.html',
  styleUrls: ['./create-freelancer.component.css']
})
export class CreateFreelancerComponent implements OnInit {
  freelancer: Freelancer;
  endereco: Endereco;
  user: User;
  group: String;
  model = {
    'nome': '',
    'sobrenome': '',
    'telefone': '',
    'nascimento': '',
    'bio': '',
    'rg': '',
    'foto': ''
  };
  enderecoModel = {
    'estado': 'SC',
    'cidade': 'Chapecó',
    'bairro': '',
    'rua': '',
    'numero': '',
    'complemento': '',
  };
  estadoOptions = [
    'SC'
  ];
  cidadeOptions = [
    'Chapecó'
  ];
  submitted = false;

  nascimentoIsValid = true;

  date = new Date();

  step = 0;

  constructor(
    private service: FreelancerService,
    private enderecoService: EnderecoService,
    private userService: UserService,
    private lct: Location,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.userService.profile().subscribe(
      (user) => {
        this.user = user;
        this.group = this.user.group;

        if (this.group == 'Freelancer' || this.group == 'Estabelecimento')
          this.router.navigate(['trampos/']);

        this.populateCampos();
      }
    );
  }

  next(): void {
    if (this.validators())
      this.step = 1;
    return;
  }

  submit(): void {
    if (this.validators())
      this.create();
    return;
  }

  create(): void {
    delete this.model.foto;
    this.service.create(this.model)
      .subscribe(
        (freelancer) => {
          if (!(Object.keys(freelancer).length === 0 
                && freelancer.constructor === Object)) {
            this.freelancer = freelancer;
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

  populateCampos(): void {
    if (this.user){
      this.model['nome'] = this.user.first_name
      this.model['sobrenome'] = this.user.last_name;
      this.model['telefone'] = this.user.telefone;
    }
  }

  validators(): boolean {
    let cont = 0;

    if (this.calculaIdade(this.model['nascimento']) > 60
      || this.calculaIdade(this.model['nascimento']) < 16) {
        this.nascimentoIsValid = false;
        cont++;
        console.log(this.calculaIdade(this.model.nascimento))
    }
    else
      this.nascimentoIsValid = true;

    if (cont != 0) {
      return false;
    }
    return true;
  }

  calculaIdade(nascimentoForm: string): Number {
    let nascimento = nascimentoForm.split("-");
    let date = new Date(Number(nascimento[0]), Number(nascimento[1]), Number(nascimento[2]));

    let diaNascimento = date.getDay();
    let mesNascimento = date.getMonth();
    let anoNascimento = date.getFullYear();
    
    let diaAtual = this.date.getDay();
    let mesAtual = this.date.getMonth()+1;
    let anoAtual = this.date.getFullYear();

    var resultDay = (diaAtual - diaNascimento);
    var resultMonth = (mesAtual - mesNascimento);
    var resultYear = (anoAtual - anoNascimento);

    if (resultMonth < 0) resultYear --;
    if (resultMonth == 0) {
      if (resultDay < 0) resultYear --;
    }

    return Number(resultYear);
  }

  onSubmit(): void { this.submitted = true; return; }

  goBack(): void {
    this.step = 0;
    return;
  }

}
