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
        this.group = user.last_name;
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
      this.upload();
    }
  }

  upload(): void {
    const formData = new FormData();
    formData.append('logo', this.form.get('foto').value);
    this.service.upload(this.estabelecimento.id, formData).subscribe(
      estabelecimento => location.reload()
    );
    return;
  }

  profile(): void {
    this.service.profile()
      .subscribe(
        (estabelecimento) => {
          this.estabelecimento = estabelecimento,
          this.imageURL = this.appService.url+this.estabelecimento.logo
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
      this.service.update(id, this.editEstabelecimento)
        .subscribe(estabelecimento => (this.estabelecimento = estabelecimento));
      this.update_address();
      this.cancelEdit();
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

  goBack(): void {
    this.location.back();
    return;
  }
}
