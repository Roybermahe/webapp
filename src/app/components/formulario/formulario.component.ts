import { Component, effect, EventEmitter, Input, OnDestroy, OnInit, Output, signal } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { UsuarioService } from '../../../services/usuarios.service';

@Component({
  selector: 'app-formulario',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './formulario.component.html',
  styleUrl: './formulario.component.css'
})
export class FormularioCrearComponent implements OnDestroy {


  @Input() title = "Registrar Usuario";
  @Output() onSubmit = new EventEmitter<any>()

  message = signal("");
  loading = signal(false);

  form: FormGroup;

  constructor(
    private fb: FormBuilder,
    private usuarioService: UsuarioService
  ) {
    this.form = this.fb.group({
      identificacion: ['',[Validators.required, Validators.min(1000000), Validators.max(99999999999)]],
      nombre: ['', [Validators.minLength(3), Validators.maxLength(100)]],
      apellido: ['',[Validators.required, Validators.minLength(3), Validators.maxLength(100)]],
      email: ['',[Validators.required, Validators.email, Validators.pattern(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/)]],
      telefono: ['',[Validators.required,Validators.minLength(10), Validators.maxLength(10)]],
      direccion: ['',[Validators.required,Validators.minLength(3), Validators.maxLength(50)]],
    })

    effect(() => {
      const usuario = this.usuarioService._consultado();
      if(usuario) {
        this.form.patchValue(usuario);
      }
    }, {
      allowSignalWrites: true
    })

    effect(() => {
      this.loading.set(this.usuarioService._loading());
      this.message.set(this.usuarioService._message());
    }, {
      allowSignalWrites: true
    })
    
  }
  ngOnDestroy(): void {
    this.form.reset({ onlySelf: true, emitEvent: true });
    this.usuarioService._consultado.set(undefined);
    this.usuarioService._message.set("");
    this.usuarioService._loading.set(false);
  }

  campoInvalido(campo: string) {
    return this.form.get(campo)?.invalid && this.form.get(campo)?.touched;
  }

  Submit() {
    this.onSubmit.emit(this.form.value);
  }
}

