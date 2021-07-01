import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { Freelancer } from '../freelancer';
import { FreelancerService } from '../freelancer.service';
import { AppService } from 'src/app/app.service';

@Component({
  selector: 'app-detail-freelancer',
  templateUrl: './detail-freelancer.component.html',
  styleUrls: ['./detail-freelancer.component.css']
})
export class DetailFreelancerComponent implements OnInit {
  freelancer: Freelancer;
  imageURL: string;
  
  constructor(
    private route: ActivatedRoute,
    private service: FreelancerService,
    private appService: AppService,
    private location: Location
  ) { }

  ngOnInit(): void {
    this.detail();
    return;
  }

  detail(): void {
    let id = this.route.snapshot.paramMap.get('id');
    this.service.detail(id)
      .subscribe(
        (freelancer) => {
          this.freelancer = freelancer,
          this.imageURL = this.freelancer.foto ? this.appService.url+this.freelancer.foto : null;
        });
    return;
  }

  goBack(): void {
    this.location.back();
    return;
  }
}
