import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PoliticaPrivacidadeComponent } from './politica-privacidade.component';

describe('PoliticaPrivacidadeComponent', () => {
  let component: PoliticaPrivacidadeComponent;
  let fixture: ComponentFixture<PoliticaPrivacidadeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PoliticaPrivacidadeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PoliticaPrivacidadeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
