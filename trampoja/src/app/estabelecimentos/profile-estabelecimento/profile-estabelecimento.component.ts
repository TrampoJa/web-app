import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { FormBuilder, FormGroup } from '@angular/forms';

import { Estabelecimento } from '../estabelecimento';
import { EstabelecimentoService } from '../estabelecimento.service';
import { AppService } from 'src/app/app.service';

import { Endereco } from '../../enderecos/endereco';
import { EnderecoService } from '../../enderecos/endereco.service';
import { UserService } from 'src/app/users/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile-estabelecimento',
  templateUrl: './profile-estabelecimento.component.html',
  styleUrls: ['./profile-estabelecimento.component.css']
})
export class ProfileEstabelecimentoComponent implements OnInit {
  estabelecimento: Estabelecimento;
  endereco: Endereco;
  group: String;
  form: FormGroup;
  imageURL: string;
  editEstabelecimento = null;
  estadoOptions = [
    'SC'
  ];
  cidadeOptions = [
    'Chapecó'
  ];

  bairroIsValid = true;
  ruaIsValid = true;
  numeroIsValid = true;
  imageIsValid = true;
  
  errorMessage: string;

  constructor(
    private formBuilder: FormBuilder,
    private service: EstabelecimentoService,
    private appService: AppService,
    private userService: UserService,
    private router: Router,
    private location: Location,
    private enderecoService: EnderecoService
  ) { }

  ngOnInit(): void {
    this.userService.profile().subscribe(
      (user) => {
        this.group = user.group;
        if (this.group != 'Estabelecimento') {
          this.router.navigate(['novo-estabelecimento/']);
        }
        else {
          this.profile();
          this.address();
          this.form = this.formBuilder.group({
            foto: ['']
          });
          return;
        }
      }
    );
  }

  loadImage(event): void {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.form.get('foto').setValue(file);
      if (this.imageValidator(file))
        this.upload();
    }
  }

  upload(): void {
    const formData = new FormData();
    formData.append('logo', this.form.get('foto').value);
    this.service.upload(this.estabelecimento.id, formData).subscribe(
      estabelecimento => this.imageURL = this.appService.url+estabelecimento.logo
    );
    return;
  }

  profile(): void {
    this.service.profile()
      .subscribe(
        (estabelecimento) => {
          this.estabelecimento = estabelecimento,
          this.imageURL = this.estabelecimento.logo ? this.appService.url+this.estabelecimento.logo : null;
        });
    return;
  }

  address(): void {
    this.enderecoService.profile()
      .subscribe(endereco => (this.endereco = endereco))
    return;
  }

  update(id: number | string): void {
    if (this.editEstabelecimento) {
      delete this.editEstabelecimento.logo;
      if (this.validators()) {
        this.service.update(id, this.editEstabelecimento)
          .subscribe(estabelecimento => (this.estabelecimento = estabelecimento));
        this.update_address();
        this.cancelEdit();
      }
    }
    return;
  }

  update_address(): void {
    this.enderecoService.update(this.endereco.id, this.endereco)
      .subscribe(endereco => (this.endereco = endereco));
    return;
  }

  edit(estabelecimento: Estabelecimento): void {
    this.editEstabelecimento = estabelecimento;
    return;
  }

  cancelEdit(): void {
    this.editEstabelecimento = null;
    this.profile();
    return;
  }

  validators(): boolean {
    let cont = 0;

    if (this.endereco.bairro.length === 0) {
      this.bairroIsValid = false;
      cont++;
    }
    else
      this.bairroIsValid = true;

    if (this.endereco.rua.length === 0) {
      this.ruaIsValid = false;
      cont++;
    }
    else
      this.ruaIsValid= true;

    if (this.endereco.numero.length === 0) {
      this.numeroIsValid = false;
      cont++;
    }
    else
      this.numeroIsValid = true;

    if (cont != 0) {
      return false;
    }
    return true;
  }

  imageValidator(file: any): boolean {
    if (file.size > 10000000){
      this.imageIsValid = false;
      this.errorMessage = "Imagem muito grande, tente uma com no máximo 10MB 😅"
      return false
    }

    if (!(file.type.match(/image\/jpeg/) || file.type.match(/image\/jpg/) || file.type.match(/image\/png/))){
      this.imageIsValid = false;
      this.errorMessage = "Isso não é uma imagem 😅"
      return false
    }

    this.imageIsValid = true;
    return true;
  }

  goBack(): void {
    this.location.back();
    return;
  }
}
