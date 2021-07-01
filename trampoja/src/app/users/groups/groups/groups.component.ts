import { group } from '@angular/animations';
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
  imageFreelancer = "../../../../assets/img/freela icone.svg";
  imageEmpresa = "../../../../assets/img/empresa icone.svg"
   
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
    this.service.setFreelancerNoGroup(
      (done) => {
        this.app.group = 'noGroupFreelancer';
      }
    );
    return;
  }

  setEstabelecimentoNoGroup(): void {
    this.service.setEstabelecimentoNoGroup(
      (done) => {
        this.app.group = 'noGroupEstabelecimento';
      }
    );
    return;
  }

}
