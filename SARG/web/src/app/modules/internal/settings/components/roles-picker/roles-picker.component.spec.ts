import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RolesPickerComponent } from './roles-picker.component';

describe('RolesPickerComponent', () => {
  let component: RolesPickerComponent;
  let fixture: ComponentFixture<RolesPickerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RolesPickerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RolesPickerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
