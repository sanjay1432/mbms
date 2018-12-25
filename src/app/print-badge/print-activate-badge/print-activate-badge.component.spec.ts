import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PrintActivateBadgeComponent } from './print-activate-badge.component';

describe('PrintActivateBadgeComponent', () => {
  let component: PrintActivateBadgeComponent;
  let fixture: ComponentFixture<PrintActivateBadgeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PrintActivateBadgeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PrintActivateBadgeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
