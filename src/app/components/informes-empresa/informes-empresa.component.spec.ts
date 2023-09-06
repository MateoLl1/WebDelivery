import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InformesEmpresaComponent } from './informes-empresa.component';

describe('InformesEmpresaComponent', () => {
  let component: InformesEmpresaComponent;
  let fixture: ComponentFixture<InformesEmpresaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [InformesEmpresaComponent]
    });
    fixture = TestBed.createComponent(InformesEmpresaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
