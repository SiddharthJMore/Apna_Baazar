import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ThinBannerComponent } from './thin-banner.component';

describe('ThinBannerComponent', () => {
  let component: ThinBannerComponent;
  let fixture: ComponentFixture<ThinBannerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ThinBannerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ThinBannerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
