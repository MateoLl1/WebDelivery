import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BodyEmpresaComponent } from './body-empresa.component';

describe('BodyEmpresaComponent', () => {
  let component: BodyEmpresaComponent;
  let fixture: ComponentFixture<BodyEmpresaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BodyEmpresaComponent]
    });
    fixture = TestBed.createComponent(BodyEmpresaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
