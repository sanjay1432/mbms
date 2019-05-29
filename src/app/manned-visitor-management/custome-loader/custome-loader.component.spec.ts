import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomeLoaderComponent } from './custome-loader.component';

describe('CustomeLoaderComponent', () => {
  let component: CustomeLoaderComponent;
  let fixture: ComponentFixture<CustomeLoaderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CustomeLoaderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomeLoaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
