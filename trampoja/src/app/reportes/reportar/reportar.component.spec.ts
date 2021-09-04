import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportarComponent } from './reportar.component';

describe('ReportarComponent', () => {
  let component: ReportarComponent;
  let fixture: ComponentFixture<ReportarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReportarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReportarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
