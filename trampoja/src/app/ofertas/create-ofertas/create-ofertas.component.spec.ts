import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { CreateOfertasComponent } from './create-ofertas.component';

describe('CreateOfertasComponent', () => {
  let component: CreateOfertasComponent;
  let fixture: ComponentFixture<CreateOfertasComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateOfertasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateOfertasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
