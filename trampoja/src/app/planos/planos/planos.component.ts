import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { PlanoService } from '../planos.service';
import { Plano } from '../plano';
import { UserService } from 'src/app/users/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-planos',
  templateUrl: './planos.component.html',
  styleUrls: ['./planos.component.css']
})
export class PlanosComponent implements OnInit {
  planos: Plano[]

  constructor(
    private service: PlanoService,
    private userService: UserService,
    private location: Location,
    private router: Router
  )  { }

  ngOnInit(): void {
    this.userService.profile().subscribe(
      (user) => {
        if (user && user.group != 'Estabelecimento')
          this.router.navigate(['/'])
        else
          this.service.list().subscribe(planos => this.planos = planos);
      }
    );
    return;
  }

  goBack(): void {
    this.location.back();
    return;
  }

}
