import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';

import { Reporte } from '../reporte';
import { ReporteService } from '../reporte.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-reportes',
  templateUrl: './reportes.component.html',
  styleUrls: ['./reportes.component.css']
})
export class ReportesComponent implements OnInit {
  reportes: Reporte[];

  constructor(private location: Location,
    private service: ReporteService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    let freelancer = this.route.snapshot.paramMap.get('id');
    
    this.service.reportes(freelancer)
      .subscribe(reportes => {
        this.reportes = reportes;

        for (let reporte of reportes)
          reporte.created = new Date(reporte.created).toLocaleDateString();
          
      });
    
    return;
  }

  goBack(): void {
    this.location.back();
    return;
  }

}
