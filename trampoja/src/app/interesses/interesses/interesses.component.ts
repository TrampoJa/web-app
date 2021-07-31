import { Component, OnInit } from '@angular/core';
import { Interesse } from '../interesse';
import { InteresseService } from '../interesse.service';
import { ConfirmadoService } from '../../confirmados/confirmado.service';

import { UserService } from 'src/app/users/user.service';

@Component({
  selector: 'app-interesses',
  templateUrl: './interesses.component.html',
  styleUrls: ['./interesses.component.css']
})
export class InteressesComponent implements OnInit {
  interesses: Interesse[] = [];
  oferta: number;
  freelancer: number;
  group = this.userService.groupValue?.group;

  constructor(
    public userService: UserService,
    private service: InteresseService,
    private confirmadoService: ConfirmadoService,
  ) { }

  ngOnInit(): void {
    this.userService.profile().subscribe(
      (user) => {
        this.group = user.group ? user.group : this.group;
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

  listE(): void {
    this.service.listE()
      .subscribe(interesses => (this.interesses = interesses));
    return;
  }

  listF(): void {
    this.service.listF()
      .subscribe(interesses => (this.interesses = interesses));
    return;
  }
  
  confirm(oferta, freelancer): void {
    if (confirm("Deseja mesmo confirmar este trampo?"))
      this.confirmadoService.create(oferta, freelancer).subscribe();
    return;
  }
}
