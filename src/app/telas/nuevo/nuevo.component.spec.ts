import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NuevoComponent } from './nuevo.component';

describe('NuevoComponent', () => {
  let component: NuevoComponent;
  let fixture: ComponentFixture<NuevoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NuevoComponent]
    });
    fixture = TestBed.createComponent(NuevoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
