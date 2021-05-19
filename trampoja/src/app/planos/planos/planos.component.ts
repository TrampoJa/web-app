import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { PlanoService } from '../planos.service';
import { Plano } from '../plano';

@Component({
  selector: 'app-planos',
  templateUrl: './planos.component.html',
  styleUrls: ['./planos.component.css']
})
export class PlanosComponent implements OnInit {
  planos: Plano[]

  constructor(
    private service: PlanoService,
    private location: Location
  )  { }

  ngOnInit(): void {
    this.service.list()
      .subscribe(planos => this.planos = planos);
    return;
  }

  goBack(): void {
    this.location.back();
    return;
  }

}
