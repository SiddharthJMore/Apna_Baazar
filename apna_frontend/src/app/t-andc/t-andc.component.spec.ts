import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TAndcComponent } from './t-andc.component';

describe('TAndcComponent', () => {
  let component: TAndcComponent;
  let fixture: ComponentFixture<TAndcComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TAndcComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TAndcComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
