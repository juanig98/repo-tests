import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InputSimpleSearchComponent } from './input-simple-search.component';

describe('InputSimpleSearchComponent', () => {
  let component: InputSimpleSearchComponent;
  let fixture: ComponentFixture<InputSimpleSearchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InputSimpleSearchComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InputSimpleSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
