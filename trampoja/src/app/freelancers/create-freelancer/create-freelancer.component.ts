import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';

import { Freelancer } from '../freelancer';
import { FreelancerService } from '../freelancer.service';
import { User } from 'src/app/users/user';

import { Endereco } from '../../enderecos/endereco';
import { EnderecoService } from '../../enderecos/endereco.service'; 
import { UserService } from 'src/app/users/user.service';

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
    'estado': '',
    'cidade': '',
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

  constructor(
    private service: FreelancerService,
    private enderecoService: EnderecoService,
    private userService: UserService,
    private lct: Location,
  ) {
      this.userService.profile().subscribe(
        (user) => {
          this.user = user;
          this.splitName();
      });
    }

  ngOnInit(): void {
    this.userService.profile().subscribe(
      (user) => {
        this.group = user.last_name;
        if (this.group == 'Freelancer' || this.group == 'Estabelecimento') {
          this.goBack();
        }
      }
    );
  }

  submit(): void {
    this.create();
    return;
  }

  create(): void {
    delete this.model.foto;
    this.service.create(this.model)
      .subscribe(
        (freelancer) => {
          this.freelancer = freelancer;
          if (Object.keys(freelancer).length === 0 
                && freelancer.constructor === Object) {
            location.reload();
          }
          else {
            this.createEndereco();
          }
        }
      );
    return;
  }

  createEndereco(): void {  
    this.enderecoService.create(this.enderecoModel)
      .subscribe(endereco => (this.endereco = endereco));
    return;
  }

  splitName(): void {
    if (this.user){
      var split = this.user.first_name.split(" ");
      this.model['nome'] = split[0];
      this.model['sobrenome'] = split[1];
    }
  }

  onSubmit(): void { this.submitted = true; return; }

  goBack(): void {
    this.lct.back();
    return;
  }

}
