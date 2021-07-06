import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

import { FreelancerService } from '../freelancer.service';
import { AppService } from 'src/app/app.service';
import { Router } from '@angular/router';
import { UserService } from 'src/app/users/user.service';


@Component({
  selector: 'app-upload-docs',
  templateUrl: './upload-docs.component.html',
  styleUrls: ['./upload-docs.component.css']
})
export class UploadDocsComponent implements OnInit {
  form: FormGroup;
  imageURL: string;
  step = 0;
  titles = [
    'Precisamos de uma foto da frente do seu RG',
    'Agora uma foto do verso do documento',
    'Por último uma selfie sua segurando o documento'
  ]

  submitted = false;
  
  nextStepIsValid = false;
  imageIsValid = true;
  
  errorMessage: string;

  constructor(
    private formBuilder: FormBuilder,
    private service: FreelancerService,
    private appService: AppService,
    private userService: UserService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.userService.profile().subscribe(
      (user) => {
        
        if (user.group === 'Freelancer'){
          this.service.possuiDocs().subscribe(
            (docs) => {
              if (docs)
                this.router.navigate(['/trampos'])

              else {
                this.form = this.formBuilder.group({
                  foto: ['']
                });
              }
          });
        }

        else if (user.group === 'Estabelecimento')
          this.router.navigate(['/meus-trampos'])

        else
          this.router.navigate(['/'])
    })
  }

  finalize(): void {
      this.router.navigate(['/trampos']);
      alert("Tudo certo com seu cadastro");
  }

  nextStep(): void {
    if (this.step === 2)
      this.finalize();
    else{
      this.imageURL = null
      this.step++;
      this.nextStepIsValid = false;
    } 
  }

  loadImage(event): void {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      if (this.validator(file)) {
        this.form.get('foto').setValue(file);
        this.upload();
      }
    }
    return;
  }

  upload(): void {
    const formData = new FormData();
    formData.append('foto', this.form.get('foto').value);
    this.service.uploadDocs(this.step, formData).subscribe(
      (freelancer) => {
        this.imageURL = this.appService.url+freelancer.foto
        this.nextStepIsValid = freelancer.foto ? true : false;
      }
    );
    return;
  }

  validator(file: any): boolean {
    if (file.size > 3000000){
      this.imageIsValid = false;
      this.nextStepIsValid = false;
      this.errorMessage = "Imagem muito grande, tente uma com no máximo 3MB 😅"
      return false
    }

    if (!(file.type.match(/image\/jpeg/) || file.type.match(/image\/jpg/) || file.type.match(/image\/png/))){
      this.imageIsValid = false;
      this.nextStepIsValid = false;
      this.errorMessage = "Isso não é uma imagem 😅"
      return false
    }

    this.imageIsValid = true;
    return true;
  }

  onSubmit(): void { this.submitted = true; return; }

}
