import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { DetailEstabelecimentoComponent } from './detail-estabelecimento.component';

describe('DetailEstabelecimentoComponent', () => {
  let component: DetailEstabelecimentoComponent;
  let fixture: ComponentFixture<DetailEstabelecimentoComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ DetailEstabelecimentoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailEstabelecimentoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
