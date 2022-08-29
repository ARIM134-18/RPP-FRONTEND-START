import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SektorComponent } from './sektor.component';

describe('SektorComponent', () => {
  let component: SektorComponent;
  let fixture: ComponentFixture<SektorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SektorComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SektorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
