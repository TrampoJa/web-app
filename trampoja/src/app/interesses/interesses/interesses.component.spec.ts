import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { InteressesComponent } from './interesses.component';

describe('InteressesComponent', () => {
  let component: InteressesComponent;
  let fixture: ComponentFixture<InteressesComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ InteressesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InteressesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
