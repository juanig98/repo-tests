import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CurrentAccountTableComponent } from './current-account-table.component';

describe('CurrentAccountTableComponent', () => {
  let component: CurrentAccountTableComponent;
  let fixture: ComponentFixture<CurrentAccountTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CurrentAccountTableComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CurrentAccountTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
