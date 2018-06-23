import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { YourReservationsComponent } from './your-reservations.component';

describe('YourReservationsComponent', () => {
  let component: YourReservationsComponent;
  let fixture: ComponentFixture<YourReservationsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ YourReservationsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(YourReservationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
