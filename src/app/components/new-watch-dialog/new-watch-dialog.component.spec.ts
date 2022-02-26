import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewWatchDialogComponent } from './new-watch-dialog.component';

describe('NewWatchDialogComponent', () => {
  let component: NewWatchDialogComponent;
  let fixture: ComponentFixture<NewWatchDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [NewWatchDialogComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NewWatchDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
