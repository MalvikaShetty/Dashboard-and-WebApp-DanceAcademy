import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InstAndStaffComponent } from './inst-and-staff.component';

describe('InstAndStaffComponent', () => {
  let component: InstAndStaffComponent;
  let fixture: ComponentFixture<InstAndStaffComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InstAndStaffComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InstAndStaffComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
