import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SektorDialogComponent } from './sektor-dialog.component';

describe('SektorDialogComponent', () => {
  let component: SektorDialogComponent;
  let fixture: ComponentFixture<SektorDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SektorDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SektorDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
