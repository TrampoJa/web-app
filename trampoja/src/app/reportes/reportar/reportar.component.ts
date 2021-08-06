import { Component, Input, OnInit, Output, EventEmitter, Injectable } from '@angular/core';
import { Freelancer } from 'src/app/freelancers/freelancer';

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
  options = {
    1: false,
    2: false,
    3: false,
    4: false,
    5: false
  }

  @Input() freelancer: Freelancer;
  @Input() habilitarReporte: boolean;
  @Output() habilitarReporteChange = new EventEmitter<boolean>();

  submitted = false;

  constructor() { }

  ngOnInit(): void {
    console.log(this.freelancer);
  }

  create(): void {
      console.log(this.options);
      console.log(this.model)
  }

  onSubmit(): void { this.submitted = true; return; }

  goBack(): void {
    this.habilitarReporte = false;
    this.habilitarReporteChange.emit(this.habilitarReporte)
    return;
  }

}
