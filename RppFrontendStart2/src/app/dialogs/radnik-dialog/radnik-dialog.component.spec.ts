import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RadnikDialogComponent } from './radnik-dialog.component';

describe('RadnikDialogComponent', () => {
  let component: RadnikDialogComponent;
  let fixture: ComponentFixture<RadnikDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RadnikDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RadnikDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
