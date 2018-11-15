import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectHostComponent } from './select-host.component';

describe('SelectHostComponent', () => {
  let component: SelectHostComponent;
  let fixture: ComponentFixture<SelectHostComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SelectHostComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectHostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
