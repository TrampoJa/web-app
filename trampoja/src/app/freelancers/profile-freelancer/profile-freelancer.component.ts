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
    }
    this.upload();
    return;
  }

  upload(): void {
    const formData = new FormData();
    formData.append('foto', this.form.get('foto').value);
    this.service.upload(this.freelancer.id, formData).subscribe(
      freelancer => location.reload()
    );
    return;
  }

  profile(): void {
    this.service.profile()
      .subscribe(
        (freelancer) => {
          this.freelancer = freelancer,
          this.imageURL = this.appService.url+this.freelancer.foto
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
      this.service.update(this.freelancer.id, this.editFreelancer)
        .subscribe(freelancer => (this.freelancer = freelancer));
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

  edit(freelancer: Freelancer): void {
    this.editFreelancer = freelancer;
    return;
  }

  cancelEdit(): void {
    this.editFreelancer = null;
    this.profile();
    return;
  }

  goBack(): void {
    this.location.back();
    return;
  }
}
