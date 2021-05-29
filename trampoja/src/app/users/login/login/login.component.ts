import { Component, OnInit } from '@angular/core';
import { AppComponent } from '../../../app.component';

import { UserService } from '../../user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  model = {
    'username': '',
    'password': ''
  }
  submitted = false;

  logo: String;

  constructor(
    private app: AppComponent,
    private service: UserService
  ) { }

  ngOnInit(): void {
    this.logo = this.app.logo;
    
    setTimeout(() => {
      this.app.opened = false;
      this.app.out();
    });
  }

  submit(): void {
    this.login();
    return;
  }

  login(): void {
    this.service.token(this.model)
      .subscribe(
        (token) => {
          if (Object.keys(token).length !== 0 
            && token.constructor === Object)
          this.service.login(this.model)
            .subscribe();
        }
      );
    return;
  }

  onSubmit(): void { this.submitted = true; return; }

}
