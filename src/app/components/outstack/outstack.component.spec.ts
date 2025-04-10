import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OutstackComponent } from './outstack.component';

describe('OutstackComponent', () => {
  let component: OutstackComponent;
  let fixture: ComponentFixture<OutstackComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [OutstackComponent]
    });
    fixture = TestBed.createComponent(OutstackComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
