import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { CreateEstabelecimentoComponent } from './create-estabelecimento.component';

describe('CreateEstabelecimentoComponent', () => {
  let component: CreateEstabelecimentoComponent;
  let fixture: ComponentFixture<CreateEstabelecimentoComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateEstabelecimentoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateEstabelecimentoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
