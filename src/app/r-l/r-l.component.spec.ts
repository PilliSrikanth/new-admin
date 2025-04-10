import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RLComponent } from './r-l.component';

describe('RLComponent', () => {
  let component: RLComponent;
  let fixture: ComponentFixture<RLComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RLComponent]
    });
    fixture = TestBed.createComponent(RLComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
