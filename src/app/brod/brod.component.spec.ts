import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BrodComponent } from './brod.component';

describe('BrodComponent', () => {
  let component: BrodComponent;
  let fixture: ComponentFixture<BrodComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BrodComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BrodComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
