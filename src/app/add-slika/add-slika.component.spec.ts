import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddSlikaComponent } from './add-slika.component';

describe('AddSlikaComponent', () => {
  let component: AddSlikaComponent;
  let fixture: ComponentFixture<AddSlikaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddSlikaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddSlikaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
