import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { Estabelecimento } from '../estabelecimento';
import { EstabelecimentoService } from '../estabelecimento.service'; 
import { AppService } from 'src/app/app.service';

@Component({
  selector: 'app-detail-estabelecimento',
  templateUrl: './detail-estabelecimento.component.html',
  styleUrls: ['./detail-estabelecimento.component.css']
})
export class DetailEstabelecimentoComponent implements OnInit {
  estabelecimento: Estabelecimento;
  imageURL: string;
  
  constructor(
    private route: ActivatedRoute,
    private service: EstabelecimentoService,
    private appService: AppService,
    private location: Location
  ) { }

  ngOnInit(): void {
    this.detail();
    return;
  }

  detail(): void {
    let id = this.route.snapshot.paramMap.get('id');
    this.service.detail(id)
      .subscribe(
        (estabelecimento) => {
          this.estabelecimento = estabelecimento,
          this.imageURL = this.appService.url+this.estabelecimento.logo
        });
    return;
  }

  goBack(): void {
    this.location.back();
    return;
  }

}
