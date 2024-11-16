import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Navigation02Component } from './navigation02.component';

describe('Navigation02Component', () => {
  let component: Navigation02Component;
  let fixture: ComponentFixture<Navigation02Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Navigation02Component]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Navigation02Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
