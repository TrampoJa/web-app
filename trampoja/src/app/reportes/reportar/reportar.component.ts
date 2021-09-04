import { Component, Input, OnInit, Output, EventEmitter, Injectable } from '@angular/core';
import { ReporteService } from '../reporte.service';

@Component({
  selector: 'app-reportar',
  templateUrl: './reportar.component.html',
  styleUrls: ['./reportar.component.css']
})
@Injectable()
export class ReportarComponent implements OnInit {
  model = {
    descricao: ''
  }
  motivos = {
    1: false,
    2: false,
    3: false,
    4: false,
    5: false
  }

  @Input() freelancer: number;
  @Input() oferta: number;
  @Input() habilitarReporte: boolean;
  @Output() habilitarReporteChange = new EventEmitter<boolean>();

  submitted = false;

  constructor(private service: ReporteService) { }

  ngOnInit(): void {
    window.scroll(0,0);
    return;
  }

  create(): void {
    this.service.reportar(this.freelancer, this.oferta, this.model['descricao'], this.motivos)
    .subscribe(
      (reporte) => {
        if (!(Object.keys(reporte).length === 0 
              && reporte.constructor === Object))
          location.reload();
        
        else
          this.close();
      }
    );
  }

  onSubmit(): void { this.submitted = true; return; }

  close(): void {
    this.habilitarReporte = false;
    this.habilitarReporteChange.emit(this.habilitarReporte)
    return;
  }

}
