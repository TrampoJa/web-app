import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ProfileOfertasComponent } from './profile-ofertas.component';

describe('ProfileOfertasComponent', () => {
  let component: ProfileOfertasComponent;
  let fixture: ComponentFixture<ProfileOfertasComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ProfileOfertasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfileOfertasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
