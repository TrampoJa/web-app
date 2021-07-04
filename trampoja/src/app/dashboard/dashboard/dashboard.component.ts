import { Component, OnInit } from '@angular/core';
import { AppComponent } from 'src/app/app.component';
import { AvalicaoService } from 'src/app/avaliacoes/avaliacao.service';
import { FreelancerService } from 'src/app/freelancers/freelancer.service';
import { UserService } from 'src/app/users/user.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  avaliacao: number;
  trampos: number

  group = this.serviceUser.groupValue?.group;

  constructor(
    private serviceAvaliacao: AvalicaoService,
    private serviceFreelancer: FreelancerService,
    private serviceUser: UserService,
    private app: AppComponent
  ) { }

  ngOnInit(): void {
    setTimeout(() => {
      this.app.in();
    })
    this.serviceAvaliacao.get().subscribe(avaliacao => (this.avaliacao = avaliacao));
    if (this.group == "Freelancer"){
      this.serviceFreelancer.countOfertas().subscribe(trampos => (this.trampos = trampos));
    }
    return;
  }
}
