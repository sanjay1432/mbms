import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FindVisitorComponent } from './find-visitor.component';

describe('FindVisitorComponent', () => {
  let component: FindVisitorComponent;
  let fixture: ComponentFixture<FindVisitorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FindVisitorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FindVisitorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
