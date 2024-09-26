import { Component, OnInit } from '@angular/core';
import { FormularioCrearComponent } from "../../components/formulario/formulario.component";
import { UsuarioService } from '../../../services/usuarios.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-editar',
  standalone: true,
  imports: [FormularioCrearComponent],
  templateUrl: './editar.component.html',
  styleUrl: './editar.component.css'
})
export class EditarComponent implements OnInit {
  id!: number;
  constructor(
    private usuarioService: UsuarioService,
    private activeRoute: ActivatedRoute
  ){}
  ngOnInit(): void {
    this.activeRoute.paramMap.subscribe((resp: any) => {
      if(resp?.params?.id) {
        this.id = resp.params.id;
        this.usuarioService.consultarUsuario = +resp.params.id;
      }
    })
  }

  guardar(data: any) {
    this.usuarioService.editarUsuario = { id: this.id , body: data};
  }
}
