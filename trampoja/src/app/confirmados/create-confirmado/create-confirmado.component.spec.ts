import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { CreateConfirmadoComponent } from './create-confirmado.component';

describe('CreateConfirmadoComponent', () => {
  let component: CreateConfirmadoComponent;
  let fixture: ComponentFixture<CreateConfirmadoComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateConfirmadoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateConfirmadoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
