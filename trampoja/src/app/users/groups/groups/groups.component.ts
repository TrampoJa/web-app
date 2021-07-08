import { Component, OnInit } from '@angular/core';
import { AppService } from 'src/app/app.service';
import { AppComponent } from '../../../app.component';
import { UserService } from '../../user.service';
import { Location  } from '@angular/common';
import { Router } from '@angular/router';
@Component({
  selector: 'app-groups',
  templateUrl: './groups.component.html',
  styleUrls: ['./groups.component.css']
})
export class GroupsComponent implements OnInit {
  imageFreelancer = "../../../../assets/img/freela icone.svg";
  imageEmpresa = "../../../../assets/img/empresa icone.svg";

  group = this.service.groupValue?.group;
   
  constructor(
    private app: AppComponent,
    private appService: AppService,
    private service: UserService,
    private location: Location,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.service.profile().subscribe(
      (user) => {
        this.group = user.group ? user.group : this.group;
        
        if (this.group === "Freelancer" || this.group === "Estabelecimento") 
          this.location.back()
      }
    );
    setTimeout(() => {
      this.app.opened = false;
      this.app.out();
    });
    this.appService.getService().subscribe();
  }

  setFreelancerNoGroup(): void {
    this.service.setGroup("noGroupFreelancer").subscribe(
      (user) => {
        this.app.group = user.group;
        this.router.navigate(['trampos/']);
      }
    )
    return;
  }

  setEstabelecimentoNoGroup(): void {
    this.service.setGroup("noGroupEstabelecimento").subscribe(
      (user) => {
        this.app.group = user.group;
        this.router.navigate(['meus-trampos/']);
      }
    )
    return;
  }

}
