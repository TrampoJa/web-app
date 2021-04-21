import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { DetailFreelancerComponent } from './detail-freelancer.component';

describe('DetailFreelancerComponent', () => {
  let component: DetailFreelancerComponent;
  let fixture: ComponentFixture<DetailFreelancerComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ DetailFreelancerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailFreelancerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
