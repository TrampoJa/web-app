import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ProfileFreelancerComponent } from './profile-freelancer.component';

describe('ProfileFreelancerComponent', () => {
  let component: ProfileFreelancerComponent;
  let fixture: ComponentFixture<ProfileFreelancerComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ProfileFreelancerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfileFreelancerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
