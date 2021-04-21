import { Component, OnInit } from '@angular/core';
import { AppService } from 'src/app/app.service';
import { AppComponent } from '../../../app.component';
import { UserService } from '../../user.service';

@Component({
  selector: 'app-groups',
  templateUrl: './groups.component.html',
  styleUrls: ['./groups.component.css']
})
export class GroupsComponent implements OnInit {

  constructor(
    private app: AppComponent,
    private appService: AppService,
    private service: UserService,
  ) { }

  ngOnInit(): void {
    setTimeout(() => {
      this.app.opened = false;
      this.app.out();
    });
    this.appService.getService().subscribe();
  }

  setFreelancerNoGroup(): void {
    this.service.setFreelancerNoGroup();
    return;
  }

  setEstabelecimentoNoGroup(): void {
    this.service.setEstabelecimentoNoGroup();
    return;
  }

}
