import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PossibleMatchComponent } from './possible-match.component';

describe('PossibleMatchComponent', () => {
  let component: PossibleMatchComponent;
  let fixture: ComponentFixture<PossibleMatchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PossibleMatchComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PossibleMatchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
