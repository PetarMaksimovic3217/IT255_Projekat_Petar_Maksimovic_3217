import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddProizvodjacComponent } from './add-proizvodjac.component';

describe('AddProizvodjacComponent', () => {
  let component: AddProizvodjacComponent;
  let fixture: ComponentFixture<AddProizvodjacComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddProizvodjacComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddProizvodjacComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
