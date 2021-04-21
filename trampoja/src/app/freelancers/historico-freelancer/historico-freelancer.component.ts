import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { FreelancerService } from '../freelancer.service';
import { Historico } from '../historico';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-historico-freelancer',
  templateUrl: './historico-freelancer.component.html',
  styleUrls: ['./historico-freelancer.component.css']
})
export class HistoricoFreelancerComponent implements OnInit {
  historicos: Historico[]

  constructor(
    private location: Location,
    private service: FreelancerService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    let freelancer_owner = this.route.snapshot.paramMap.get('id');
    this.service.history(freelancer_owner)
      .subscribe(historicos => (this.historicos = historicos));
    return;
  }

  goBack(): void {
    this.location.back();
    return;
  }

}
