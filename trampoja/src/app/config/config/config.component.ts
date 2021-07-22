import { Component, OnInit } from '@angular/core';

import { UserService } from '../../users/user.service';

@Component({
  selector: 'app-config',
  templateUrl: './config.component.html',
  styleUrls: ['./config.component.css']
})
export class ConfigComponent implements OnInit {
  model = {
    'email': '',
    'password': '',
    'confirm_password': ''
  }

  passwordIsValid = true;
  confirm_passwordIsValid = true;
  emailIsValid = true;

  constructor( private service: UserService ) { }

  ngOnInit(): void {
    this.service.profile()
      .subscribe(email => (this.model['email'] = email['email']));
    return;
  }

  submit() {
    if (this.model['email'] && !this.model['password'])
      this.update_email()
    if (this.model['password'])
      this.set_password()
  }

  update_email(): void {
    if (this.email_validator()) {
      this.service.update_email({'email': this.model['email']}).
        subscribe();
    }
    return;
  }

  set_password(): void {
    if (this.password_validator()) {
      this.service.update_password({'password': this.model['password']}).
        subscribe();
    }
    return;
  }

  email_validator(): boolean {
    let cont = 0;
    if (!this.model['email'].match(/@/) || !this.model['email'].match(/.com/)) {
      this.emailIsValid = false;
      cont ++;
    }
    if (cont !== 0){
      return false;
    }
    return true
  }

  password_validator(): boolean {
    let cont = 0;
    if (this.model['password'].length < 6) {
      this.passwordIsValid = false;
      cont ++;
    }
    if (this.model['password'] !== this.model['confirm_password']){
      this.confirm_passwordIsValid = false;
      cont ++;
    }
    if (cont !== 0){
      return false;
    }
    return true
  }

}
