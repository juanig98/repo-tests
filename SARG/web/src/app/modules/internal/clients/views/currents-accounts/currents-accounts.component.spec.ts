import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CurrentsAccountsComponent } from './currents-accounts.component';

describe('CurrentsAccountsComponent', () => {
  let component: CurrentsAccountsComponent;
  let fixture: ComponentFixture<CurrentsAccountsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CurrentsAccountsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CurrentsAccountsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
