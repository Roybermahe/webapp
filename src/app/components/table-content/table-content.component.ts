import { Component, effect, signal } from '@angular/core';
import { UsuarioService } from '../../../services/usuarios.service';
import { DatePipe } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-table-content',
  standalone: true,
  imports: [DatePipe, RouterLink],
  templateUrl: './table-content.component.html',
  styleUrl: './table-content.component.css'
})
export class TableContentComponent {

  listaUsuarios = signal([] as any[]);

  constructor(
    private usuarioService: UsuarioService
  ) {
    usuarioService.listaUsuarios.subscribe(resp => this.listaUsuarios.set([...resp]));
  }

  borrarUsuario(id: number) {
    this.usuarioService.borrarUsuario = id;
  }
}
