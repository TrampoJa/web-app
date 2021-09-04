import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
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
  @Input() habilitarAvaliacao: boolean;
  @Output() habilitarAvaliacaoChange = new EventEmitter<boolean>();
  
  constructor(
    private service: AvalicaoService,
  ) { }

  ngOnInit(): void {
    return;
  }

  confirm(nota: number): void {
    this.service.create(this.owner, this.oferta, nota)
      .subscribe(
        (avaliacao) => {
          if (!(Object.keys(avaliacao).length === 0 
                && avaliacao.constructor === Object))
            location.reload();
          
          else
            this.close();
        }
      );
  }

  color(id: string, flag: string): void {
    let star = document.getElementById(id);

    if (flag == 'add')
      star.style.color = 'yellow';
    else
      star.style.color = null;
  }

  close(): void {
    let container = document.getElementById('container-confirmados');
    container.style.opacity = '1';

    this.habilitarAvaliacao = false;
    this.habilitarAvaliacaoChange.emit(this.habilitarAvaliacao)
    return;
  }
}
