import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddKategorijaComponent } from './add-kategorija.component';

describe('AddKategorijaComponent', () => {
  let component: AddKategorijaComponent;
  let fixture: ComponentFixture<AddKategorijaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddKategorijaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddKategorijaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
