import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PrintAssignBadgeComponent } from './print-assign-badge.component';

describe('PrintAssignBadgeComponent', () => {
  let component: PrintAssignBadgeComponent;
  let fixture: ComponentFixture<PrintAssignBadgeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PrintAssignBadgeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PrintAssignBadgeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
