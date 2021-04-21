import { Component, OnInit } from '@angular/core';
import { Oferta } from '../oferta';
import { AppComponent } from 'src/app/app.component';
import { OfertaService } from '../oferta.service';
import { AppService } from 'src/app/app.service';


@Component({
  selector: 'app-ofertas',
  templateUrl: './ofertas.component.html',
  styleUrls: ['./ofertas.component.css']
})

export class OfertasComponent implements OnInit {
  ofertas: Oferta[];
  imageURL: string;

  constructor(
    private app: AppComponent,
    private service: OfertaService,
    public appService: AppService
  ) { }

  ngOnInit(): void {
    setTimeout(() => {
      this.app.in();
    });
    this.list();
    return;
  }

  list(): void {
    this.service.list()
      .subscribe(ofertas => (this.ofertas = ofertas));
    return;
  }
}