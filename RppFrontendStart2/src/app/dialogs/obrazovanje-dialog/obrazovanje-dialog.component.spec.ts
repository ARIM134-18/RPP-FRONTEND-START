import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ObrazovanjeDialogComponent } from './obrazovanje-dialog.component';

describe('ObrazovanjeDialogComponent', () => {
  let component: ObrazovanjeDialogComponent;
  let fixture: ComponentFixture<ObrazovanjeDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ObrazovanjeDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ObrazovanjeDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
