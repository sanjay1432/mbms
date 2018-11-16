import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VisitorConfirmationComponent } from './visitor-confirmation.component';

describe('VisitorConfirmationComponent', () => {
  let component: VisitorConfirmationComponent;
  let fixture: ComponentFixture<VisitorConfirmationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VisitorConfirmationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VisitorConfirmationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
