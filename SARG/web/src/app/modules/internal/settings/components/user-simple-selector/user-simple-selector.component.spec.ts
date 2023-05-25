import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserSimpleSelectorComponent } from './user-simple-selector.component';

describe('UserSimpleSelectorComponent', () => {
  let component: UserSimpleSelectorComponent;
  let fixture: ComponentFixture<UserSimpleSelectorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserSimpleSelectorComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserSimpleSelectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
