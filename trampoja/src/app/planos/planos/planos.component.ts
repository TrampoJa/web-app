import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { PlanoService } from '../planos.service';

@Component({
  selector: 'app-planos',
  templateUrl: './planos.component.html',
  styleUrls: ['./planos.component.css']
})
export class PlanosComponent implements OnInit {

  constructor(
    private service: PlanoService,
    private location: Location
  )  { }

  ngOnInit(): void {
    this.service.list().subscribe();
    return;
  }

  goBack(): void {
    this.location.back();
    return;
  }

}
