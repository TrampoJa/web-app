import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { Oferta } from '../oferta';
import { OfertaService } from '../oferta.service';
import { UserService } from 'src/app/users/user.service';

@Component({
  selector: 'app-detail-ofertas',
  templateUrl: './detail-ofertas.component.html',
  styleUrls: ['./detail-ofertas.component.css']
})
export class DetailOfertasComponent implements OnInit {
  oferta: Oferta;
  editOferta = null;

  owner = this.userService.ownerValue?.owner;
  group = this.userService.groupValue?.group;

  dateIsValid = true;
  valorIsValid = true;

  constructor(
    private route: ActivatedRoute,
    public userService: UserService,
    private service: OfertaService,
    private location: Location
  ) { }

  ngOnInit(): void {
    this.userService.profile().subscribe(
      (user) => {
        this.group = user.group ? user.group : this.group;
      }); 
    this.detail();
    return;
  }

  detail(): void {
    let id = this.route.snapshot.paramMap.get('id');
    this.service.detail(id)
      .subscribe(oferta => (this.oferta = oferta));
    return;
  }

  update(): void {
    if (this.editOferta) {
      let id = this.route.snapshot.paramMap.get('id');
      if (this.validators()) {
        this.service.update(id, this.editOferta)
          .subscribe(oferta => (this.oferta = oferta));
        this.cancelEdit();
      } 
    }
    return;
  }

  delete(): void {
    if (!confirm("Deseja mesmo excluir este trampo?")) {
      this.detail();
    }
    else {
      let id = this.route.snapshot.paramMap.get('id');
      this.service.delete(id).subscribe();
      this.goBack();
    }
    return;
  }

  edit(oferta: Oferta): void {
    this.editOferta = oferta;
    return;
  }

  cancelEdit(): void {
    this.editOferta = null;
    this.detail();
    return;
  }

  validators(): boolean {
    let cont = 0;

    if (this.dataOfertaMenorDataAtual(this.oferta.date_inicial, this.oferta.time)) {
      this.dateIsValid = false;
      cont++
    }
    else
      this.dateIsValid = true;

    if (Number(this.oferta.valor) < 10) {
      this.valorIsValid = false;
      cont++;
    }
    else
      this.valorIsValid = true;
    
    if (cont != 0) {
      return false;
    }

    return true;
  }

  dataOfertaMenorDataAtual(dateForm: string, timeForm: string): boolean {
    let splitDate = dateForm.split("-");
    let splitTime = timeForm.split(":");

    let ofertaDate = new Date(
      Number(splitDate[0]), Number(splitDate[1])-1, Number(splitDate[2]), 
      Number(splitTime[0]), Number(splitTime[1])
    );

    let date = new Date();

    if (ofertaDate < date)
      return true

    return false;
  }

  goBack(): void {
    this.location.back();
    return;
  }
}
