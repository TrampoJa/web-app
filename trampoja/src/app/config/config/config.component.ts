import { Component, OnInit } from '@angular/core';

import { UserService } from '../../users/user.service';

@Component({
  selector: 'app-config',
  templateUrl: './config.component.html',
  styleUrls: ['./config.component.css']
})
export class ConfigComponent implements OnInit {
  email: string;
  password: string;
  confirm_password: string;

  passwordIsValid = true;
  confirm_passwordIsValid = true;
  emailIsValid = true;

  constructor( private service: UserService ) { }

  ngOnInit(): void {
    this.service.profile()
      .subscribe(email => (this.email = email['email']));
    return;
  }

  update(email: string): void {
    if (this.email_validator()) {
      this.service.update_email({'email': email}).
        subscribe();
    }
    return;
  }

  set_password(password: string): void {
    if (this.password_validator()) {
      this.service.update_password({'password': password}).
        subscribe();
    }
    return;
  }

  email_validator(): boolean {
    let cont = 0;
    if (!this.email.match(/@/) || !this.email.match(/.com/)) {
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
    if (this.password.length < 6) {
      this.passwordIsValid = false;
      cont ++;
    }
    if (this.password !== this.confirm_password){
      this.confirm_passwordIsValid = false;
      cont ++;
    }
    if (cont !== 0){
      return false;
    }
    return true
  }

}
