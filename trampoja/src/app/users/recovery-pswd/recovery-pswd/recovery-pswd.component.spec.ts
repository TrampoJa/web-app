import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecoveryPswdComponent } from './recovery-pswd.component';

describe('RecoveryPswdComponent', () => {
  let component: RecoveryPswdComponent;
  let fixture: ComponentFixture<RecoveryPswdComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RecoveryPswdComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RecoveryPswdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
