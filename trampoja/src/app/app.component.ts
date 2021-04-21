import { Component } from '@angular/core';

import { AppService } from './app.service';
import { UserService } from './users/user.service'
import { Injectable } from '@angular/core';

import * as $ from 'jquery';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
@Injectable()
export class AppComponent {
  title = 'TrampoJá';
  opened = false;
  activated = true;

  owner = this.service.ownerValue?.owner;
  group = this.service.groupValue?.group;

  date = new Date();

  constructor(
    private app: AppService,
    private service: UserService
  ) { }

  ngOnInit(): void {
    this.app.getService().subscribe();
    return;
  }

  in(): void {
    this.activated = true;
    if (!this.group) {
      location.reload();
    }
    return;
  }

  out(): void {
    this.activated = false;
    return;
  }

  logout(): void {
    this.service.logout();
    return;
  }
}
