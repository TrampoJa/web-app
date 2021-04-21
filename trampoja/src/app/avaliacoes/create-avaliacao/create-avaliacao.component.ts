import { Component, Input, OnInit } from '@angular/core';
import { Injectable } from '@angular/core';

import { AvalicaoService } from '../avaliacao.service'
import { Avaliacao } from '../avaliacao';

@Component({
  selector: 'app-create-avaliacao',
  templateUrl: './create-avaliacao.component.html',
  styleUrls: ['./create-avaliacao.component.css']
})
@Injectable()
export class CreateAvaliacaoComponent implements OnInit {
  avalicao: Avaliacao;
  notas = [1, 2, 3, 4, 5];

  @Input() oferta: number;
  @Input() owner: number;
  
  constructor(private service: AvalicaoService) { }

  ngOnInit(): void {
    return;
  }

  confirm(nota: number): void {
    this.service.create(this.owner, this.oferta, nota)
      .subscribe(
        (avaliacao) => {
          location.reload();
        });
  }

  goBack(): void {
    location.reload();
    return;
  }
}
