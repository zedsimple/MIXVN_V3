import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AlertLoginComponent } from './alert-login.component';

describe('AlertLoginComponent', () => {
  let component: AlertLoginComponent;
  let fixture: ComponentFixture<AlertLoginComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AlertLoginComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AlertLoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
