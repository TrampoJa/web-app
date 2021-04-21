import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HistoricoFreelancerComponent } from './historico-freelancer.component';

describe('HistoricoFreelancerComponent', () => {
  let component: HistoricoFreelancerComponent;
  let fixture: ComponentFixture<HistoricoFreelancerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HistoricoFreelancerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HistoricoFreelancerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
