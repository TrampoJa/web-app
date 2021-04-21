import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { CreateInteresseComponent } from './create-interesse.component';

describe('CreateInteresseComponent', () => {
  let component: CreateInteresseComponent;
  let fixture: ComponentFixture<CreateInteresseComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateInteresseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateInteresseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
