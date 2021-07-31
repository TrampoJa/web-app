import { Injectable } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { ConfirmadoService } from '../confirmado.service';

@Component({
  selector: 'app-create-confirmado',
  templateUrl: './create-confirmado.component.html',
  styleUrls: ['./create-confirmado.component.css']
})
@Injectable()
export class CreateConfirmadoComponent implements OnInit {
  constructor(
    private service: ConfirmadoService
  ) { }

  ngOnInit(): void {
    return;
  }
}
