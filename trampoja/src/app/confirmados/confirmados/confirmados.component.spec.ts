import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ConfirmadosComponent } from './confirmados.component';

describe('ConfirmadosComponent', () => {
  let component: ConfirmadosComponent;
  let fixture: ComponentFixture<ConfirmadosComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ConfirmadosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfirmadosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
