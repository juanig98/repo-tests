import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientCurrentAccountComponent } from './client-current-account.component';

describe('ClientCurrentAccountComponent', () => {
  let component: ClientCurrentAccountComponent;
  let fixture: ComponentFixture<ClientCurrentAccountComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ClientCurrentAccountComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ClientCurrentAccountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
