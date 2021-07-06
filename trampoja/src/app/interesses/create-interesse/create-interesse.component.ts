import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { InteresseService } from '../interesse.service';

import { Interesse } from '../interesse';
import { UserService } from 'src/app/users/user.service';
import { FreelancerService } from 'src/app/freelancers/freelancer.service';

@Component({
  selector: 'app-create-interesse',
  templateUrl: './create-interesse.component.html',
  styleUrls: ['./create-interesse.component.css']
})
export class CreateInteresseComponent implements OnInit {
  interesse: Interesse;
  group: String;

  constructor(
    private service: InteresseService,
    private userService: UserService,
    private freelancerService: FreelancerService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    return;
  }

  create(): void {
    this.userService.profile().subscribe(
      (user) => {
        this.group = user.group;
        
        if (this.group != 'Freelancer') {
          this.router.navigate(['novo-freelancer/']);
        }

        else if (this.group === 'Freelancer') {
          this.freelancerService.possuiDocs().subscribe((docs) => {
            if (docs) {
              if (confirm("Deseja mesmo demonstrar interesse nesse trampo?")){
                let id = this.route.snapshot.paramMap.get('id');
                this.service.create(id).subscribe();
                return;
              }
            }

            else 
              this.router.navigate(['/upload'])
          })
        }
      }
    )
  }
}
