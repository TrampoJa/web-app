import { Component, OnInit } from '@angular/core';
import { AppComponent } from '../../../app.component';
import { Location } from '@angular/common';
import { UserService } from '../../user.service';

@Component({
  selector: 'app-recovery-pswd',
  templateUrl: './recovery-pswd.component.html',
  styleUrls: ['./recovery-pswd.component.css']
})
export class RecoveryPswdComponent implements OnInit {
  model = {'email': ''}
  submitted = false;

  constructor(
    private app: AppComponent,
    private service: UserService,
    private location: Location
    ) { }

  ngOnInit(): void {
    setTimeout(() => {
      this.app.opened = false;
      this.app.out();
    });
  }

  recovery(): void {
    this.service.recovery(this.model).subscribe();
  }

  submit(): void {
    this.recovery();
    return;
  }

  onSubmit(): void { this.submitted = true; return; }

  goBack(): void {
    this.location.back();
    return;
  }

}
