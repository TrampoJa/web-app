import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { DetailOfertasComponent } from './detail-ofertas.component';

describe('DetailOfertasComponent', () => {
  let component: DetailOfertasComponent;
  let fixture: ComponentFixture<DetailOfertasComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ DetailOfertasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailOfertasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
