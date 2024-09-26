import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormularioCrearComponent } from './formulario.component';

describe('FormularioCrearComponent', () => {
  let component: FormularioCrearComponent;
  let fixture: ComponentFixture<FormularioCrearComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormularioCrearComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormularioCrearComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
