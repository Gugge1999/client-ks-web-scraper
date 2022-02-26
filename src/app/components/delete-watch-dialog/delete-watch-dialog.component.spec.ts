import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteWatchDialogComponent } from './delete-watch-dialog.component';

describe('DeleteWatchDialogComponent', () => {
  let component: DeleteWatchDialogComponent;
  let fixture: ComponentFixture<DeleteWatchDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DeleteWatchDialogComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DeleteWatchDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
