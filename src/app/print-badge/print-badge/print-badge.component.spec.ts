import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PrintBadgeComponent } from './print-badge.component';

describe('PrintBadgeComponent', () => {
  let component: PrintBadgeComponent;
  let fixture: ComponentFixture<PrintBadgeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PrintBadgeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PrintBadgeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
