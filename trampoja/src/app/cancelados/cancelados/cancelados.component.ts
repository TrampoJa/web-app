import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/users/user.service';
import { Cancelado } from '../cancelado';
import { CanceladoService } from '../cancelado.service';

@Component({
  selector: 'app-cancelados',
  templateUrl: './cancelados.component.html',
  styleUrls: ['./cancelados.component.css']
})
export class CanceladosComponent implements OnInit {
  cancelados: Cancelado[];
  group  = this.userService.groupValue?.group;

  constructor(
    private service: CanceladoService,
    private userService: UserService,
  ) { }

  ngOnInit(): void {
    this.userService.profile().subscribe(
      (user) => {
        this.group = user.last_name;
        if (this.group == "Freelancer") {
          this.listF();
        }
        else {
          this.listE();
        }
      }
    );
    return;
  }

  listF(): void {
    this.service.listF()
      .subscribe(cancelados => (this.cancelados = cancelados))
    return;
  }

  listE(): void {
    this.service.listE()
      .subscribe(cancelados => (this.cancelados = cancelados))
    return;
  }

}
