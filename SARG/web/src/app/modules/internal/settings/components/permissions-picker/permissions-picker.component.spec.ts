import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PermissionsPickerComponent } from './permissions-picker.component';

describe('PermissionsPickerComponent', () => {
  let component: PermissionsPickerComponent;
  let fixture: ComponentFixture<PermissionsPickerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PermissionsPickerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PermissionsPickerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
