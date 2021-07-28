import { Component, OnInit } from '@angular/core';
import { AppComponent } from 'src/app/app.component';

@Component({
  selector: 'app-termos-servico',
  templateUrl: './termos-servico.component.html',
  styleUrls: ['./termos-servico.component.css']
})
export class TermosServicoComponent implements OnInit {

  constructor(private app: AppComponent) { }

  ngOnInit(): void {
    this.app.menu = false;
    this.app.config = false;
  }

}
