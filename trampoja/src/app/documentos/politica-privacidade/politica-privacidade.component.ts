import { Component, OnInit } from '@angular/core';
import { AppComponent } from 'src/app/app.component';

@Component({
  selector: 'app-politica-privacidade',
  templateUrl: './politica-privacidade.component.html',
  styleUrls: ['./politica-privacidade.component.css']
})
export class PoliticaPrivacidadeComponent implements OnInit {

  constructor(private app: AppComponent) { }

  ngOnInit(): void {
    this.app.menu = false;
    this.app.config = false;
  }

}
