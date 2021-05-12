import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';

@Component({
  selector: 'app-planos',
  templateUrl: './planos.component.html',
  styleUrls: ['./planos.component.css']
})
export class PlanosComponent implements OnInit {

  constructor(private location: Location)  { }

  ngOnInit(): void {
  }

  goBack(): void {
    this.location.back();
    return;
  }

}
