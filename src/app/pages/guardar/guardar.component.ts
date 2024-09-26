import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { FormularioCrearComponent } from "../../components/formulario/formulario.component";
import { UsuarioService } from '../../../services/usuarios.service';

@Component({
  selector: 'app-guardar',
  standalone: true,
  imports: [RouterLink, FormularioCrearComponent],
  templateUrl: './guardar.component.html',
  styleUrl: './guardar.component.css'
})
export class GuardarComponent {

  constructor(
    private usuarioService: UsuarioService
  ){}

  guardar(data: any) {
    this.usuarioService.crearUsuario = data;
  }
}
