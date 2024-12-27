import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StaffDetailsModalComponent } from './staff-details-modal.component';

describe('StaffDetailsModalComponent', () => {
  let component: StaffDetailsModalComponent;
  let fixture: ComponentFixture<StaffDetailsModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StaffDetailsModalComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StaffDetailsModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
