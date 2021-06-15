import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Freelancer } from '../freelancer';

import { FreelancerService } from '../freelancer.service';
import { AppService } from 'src/app/app.service';

@Component({
  selector: 'app-upload-docs',
  templateUrl: './upload-docs.component.html',
  styleUrls: ['./upload-docs.component.css']
})
export class UploadDocsComponent implements OnInit {
  freelancer: Freelancer;
  form: FormGroup;
  imageURL: string;
  steps = 0;
  nextStepIsValid = false;
  titles = [
    'Precisamos de uma foto da frente do seu RG',
    'Agora uma foto do verso',
    'Por último uma selfie sua segurando o documento'
  ]

  submitted = false;

  constructor(
    private formBuilder: FormBuilder,
    private service: FreelancerService,
    private appService: AppService
  ) { }

  ngOnInit(): void {
    this.service.profile().subscribe(freelancer => this.freelancer = freelancer);
    this.form = this.formBuilder.group({
      foto: ['']
    });
  }

  finalize(): void {

  }

  nextSteps(): void {
    if (this.steps === 2)
      this.finalize();
    else
      this.steps++;
      this.nextStepIsValid = false;
  }

  loadImage(event): void {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.form.get('foto').setValue(file);
    }
    this.upload();
    return;
  }

  upload(): void {
    const formData = new FormData();
    formData.append('foto', this.form.get('foto').value);
    this.service.upload(this.freelancer.id, formData).subscribe(
      (freelancer) => {
        this.nextStepIsValid = true;
      }
    );
    return;
  }

  onSubmit(): void { this.submitted = true; return; }

}
