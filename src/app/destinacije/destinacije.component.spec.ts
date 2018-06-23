import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DestinacijeComponent } from './destinacije.component';

describe('DestinacijeComponent', () => {
  let component: DestinacijeComponent;
  let fixture: ComponentFixture<DestinacijeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DestinacijeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DestinacijeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
