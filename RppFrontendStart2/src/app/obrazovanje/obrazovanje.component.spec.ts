import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ObrazovanjeComponent } from './obrazovanje.component';

describe('ObrazovanjeComponent', () => {
  let component: ObrazovanjeComponent;
  let fixture: ComponentFixture<ObrazovanjeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ObrazovanjeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ObrazovanjeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
