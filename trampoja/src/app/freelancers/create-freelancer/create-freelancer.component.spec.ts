import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { CreateFreelancerComponent } from './create-freelancer.component';

describe('CreateFreelancerComponent', () => {
  let component: CreateFreelancerComponent;
  let fixture: ComponentFixture<CreateFreelancerComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateFreelancerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateFreelancerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
