import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RoleSimpleSelectorComponent } from './role-simple-selector.component';

describe('RoleSimpleSelectorComponent', () => {
  let component: RoleSimpleSelectorComponent;
  let fixture: ComponentFixture<RoleSimpleSelectorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RoleSimpleSelectorComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RoleSimpleSelectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
