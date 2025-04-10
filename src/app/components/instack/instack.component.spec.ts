import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InstackComponent } from './instack.component';

describe('InstackComponent', () => {
  let component: InstackComponent;
  let fixture: ComponentFixture<InstackComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [InstackComponent]
    });
    fixture = TestBed.createComponent(InstackComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
