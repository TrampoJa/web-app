import { Component, OnInit } from '@angular/core';
import { Oferta } from '../oferta';
import { OfertaService } from '../oferta.service';
import { AppComponent } from 'src/app/app.component';

@Component({
  selector: 'app-profile-ofertas',
  templateUrl: './profile-ofertas.component.html',
  styleUrls: ['./profile-ofertas.component.css']
})
export class ProfileOfertasComponent implements OnInit {
  ofertas: Oferta[];

  constructor(
    private app: AppComponent,
    private service: OfertaService
  ) { }

  ngOnInit(): void {
    setTimeout(() => {
      this.app.in();
    });
    this.profile();
    return;
  }

  profile(): void {
    this.service.profile()
      .subscribe(ofertas => (this.ofertas = ofertas));
    return;
  }
}
