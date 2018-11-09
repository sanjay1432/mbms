import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddtowatchlistComponent } from './addtowatchlist.component';

describe('AddtowatchlistComponent', () => {
  let component: AddtowatchlistComponent;
  let fixture: ComponentFixture<AddtowatchlistComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddtowatchlistComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddtowatchlistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
