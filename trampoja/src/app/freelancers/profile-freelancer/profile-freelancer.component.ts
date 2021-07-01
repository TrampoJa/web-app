import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { FormBuilder, FormGroup } from '@angular/forms';

import { Freelancer } from '../freelancer';
import { FreelancerService } from '../freelancer.service';
import { AppService } from 'src/app/app.service';

import { Endereco } from '../../enderecos/endereco';
import { EnderecoService } from '../../enderecos/endereco.service';
import { UserService } from 'src/app/users/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile-freelancer',
  templateUrl: './profile-freelancer.component.html',
  styleUrls: ['./profile-freelancer.component.css']
})
export class ProfileFreelancerComponent implements OnInit {
  freelancer: Freelancer;
  endereco: Endereco;
  group: String;
  form: FormGroup;
  imageURL: string;
  editFreelancer = null;
  estadoOptions = [
    'SC'
  ];
  cidadeOptions = [
    'Chapecó'
  ];

  nascimentoIsValid = true;
  bairroIsValid = true;
  ruaIsValid = true;
  numeroIsValid = true;
  complementoIsValid = true;
  imageIsValid = true;
  
  errorMessage: string;

  date = new Date()

  constructor(
    private formBuilder: FormBuilder,
    private service: FreelancerService,
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
        if (this.group != 'Freelancer') {
          this.router.navigate(['novo-freelancer/']);
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
    return;
  }

  upload(): void {
    const formData = new FormData();
    formData.append('foto', this.form.get('foto').value);
    this.service.upload(this.freelancer.id, formData).subscribe(
      freelancer => this.imageURL = this.appService.url+freelancer.foto
    );
    return;
  }

  profile(): void {
    this.service.profile()
      .subscribe(
        (freelancer) => {
          this.freelancer = freelancer,
          this.imageURL = this.freelancer.foto ? this.appService.url+this.freelancer.foto : null;
        });
    return;
  }

  address(): void {
    this.enderecoService.profile()
      .subscribe(endereco => (this.endereco = endereco));
    return;
  }

  update(): void {
    if (this.editFreelancer) {
      delete this.editFreelancer.foto
      if (this.validators()) {
        this.service.update(this.freelancer.id, this.editFreelancer)
          .subscribe(freelancer => (this.freelancer = freelancer));
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

  edit(freelancer: Freelancer): void {
    this.editFreelancer = freelancer;
    return;
  }

  cancelEdit(): void {
    this.editFreelancer = null;
    this.profile();
    return;
  }

  validators(): boolean {
    let cont = 0;

    console.log(this.endereco.numero)

    if (this.calculaIdade(this.freelancer.nascimento) > 60
      || this.calculaIdade(this.freelancer.nascimento) < 16) {
        this.nascimentoIsValid = false;
        cont++;
    }
    else
      this.nascimentoIsValid = true;

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
      this.ruaIsValid = true;

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

  imageValidator(file: any): boolean {
    if (file.size > 3000000){
      this.imageIsValid = false;
      this.errorMessage = "Imagem muito grande, tente uma com no máximo 3MB 😅"
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
