import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApiStatusDialogComponent } from './api-status-dialog.component';

describe('ApiStatusDialogComponent', () => {
  let component: ApiStatusDialogComponent;
  let fixture: ComponentFixture<ApiStatusDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ApiStatusDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ApiStatusDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
