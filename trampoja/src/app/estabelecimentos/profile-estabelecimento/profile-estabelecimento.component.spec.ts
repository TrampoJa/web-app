import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ProfileEstabelecimentoComponent } from './profile-estabelecimento.component';

describe('ProfileEstabelecimentoComponent', () => {
  let component: ProfileEstabelecimentoComponent;
  let fixture: ComponentFixture<ProfileEstabelecimentoComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ProfileEstabelecimentoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfileEstabelecimentoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
