import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PreduzeceDialogComponent } from './preduzece-dialog.component';

describe('PreduzeceDialogComponent', () => {
  let component: PreduzeceDialogComponent;
  let fixture: ComponentFixture<PreduzeceDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PreduzeceDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PreduzeceDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
