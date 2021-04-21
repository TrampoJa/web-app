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

  constructor(
    private route: ActivatedRoute,
    public userService: UserService,
    private service: OfertaService,
    private location: Location
  ) { }

  ngOnInit(): void {
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
      this.service
        .update(id, this.editOferta)
        .subscribe(oferta => (this.oferta = oferta));
      this.cancelEdit();
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

  goBack(): void {
    this.location.back();
    return;
  }
}
