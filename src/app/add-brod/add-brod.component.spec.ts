import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddBrodComponent } from './add-brod.component';

describe('AddBrodComponent', () => {
  let component: AddBrodComponent;
  let fixture: ComponentFixture<AddBrodComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddBrodComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddBrodComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
