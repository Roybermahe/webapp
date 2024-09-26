import { Component, effect, OnDestroy, signal } from '@angular/core';
import { UsuarioService } from '../../../services/usuarios.service';
import { CommonModule, DatePipe } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-detalle',
  standalone: true,
  imports: [DatePipe, RouterLink,CommonModule],
  templateUrl: './detalle.component.html',
  styleUrl: './detalle.component.css'
})
export class DetalleComponent implements OnDestroy {

  loading = signal(true);
  usuario = signal({} as any);
  constructor(
    private usuarioService: UsuarioService
  ){
    effect(() => {
      const usuario = this.usuarioService._consultado();
      if(usuario) {
        this.usuario.set(usuario);
        this.loading.set(false);
      }
    }, {
      allowSignalWrites: true
    })
  }

  ngOnDestroy(): void {
    this.usuarioService._consultado.set(undefined);
    this.usuario.set({} as any);
    this.loading.set(true);
  }
}
