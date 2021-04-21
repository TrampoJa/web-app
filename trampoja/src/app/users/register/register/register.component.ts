import { Component, OnInit } from '@angular/core';
import { AppComponent } from '../../../app.component';

import { User } from '../../user';
import { UserService } from '../../user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  user: User;
  model = {
    'username': '',
    'password': '',
    'confirm_password': '',
    'email': '',
    'first_name': '',
    'last_name': ''
  };
  submitted = false;

  firt_nameIsValid = true;
  last_nameIsValid = true;
  passwordIsValid = true;
  confirm_passwordIsValid = true;
  emailIsValid = true;

  constructor(
    private app: AppComponent,
    private service: UserService
  ) { }

  ngOnInit(): void {
    setTimeout(() => {
      this.app.out();
    });
    return;
  }

  submit(): void {
    if (this.validators()) {
      this.create();
    }
    return;
  }

  create(): void {
    this.service.create(this.model)
      .subscribe();
    return;
  }

  validators(): boolean {
    let cont = 0;
    if (this.model['first_name'].length <= 1) {
      this.firt_nameIsValid = !this.firt_nameIsValid;
      cont ++;
    }
    if (this.model['last_name'].length <= 1) {
      this.last_nameIsValid = !this.last_nameIsValid;
      cont ++;
    }
    if (this.model['password'].length < 6) {
      this.passwordIsValid = !this.passwordIsValid;
      cont ++;
    }
    if (this.model['password'] !== this.model['confirm_password']) {
      this.confirm_passwordIsValid = !this.confirm_passwordIsValid;
      cont ++;
    }
    if (!this.model['email'].match(/@/) || !this.model['email'].match(/.com/)) {
      this.emailIsValid = !this.emailIsValid;
      cont ++;
    }
    this.model['username'] = this.model['email'];
    if (cont !== 0){
      return false;
    }
    return true;
  }

  onSubmit(): void { this.submitted = true; return; }
}
