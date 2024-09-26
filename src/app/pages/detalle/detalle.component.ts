import { Component } from '@angular/core';
import { DetalleComponent } from "../../components/detalle/detalle.component";
import { UsuarioService } from '../../../services/usuarios.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-detalle-page',
  standalone: true,
  imports: [DetalleComponent],
  templateUrl: './detalle.component.html',
  styleUrl: './detalle.component.css'
})
export class DetallePageComponent {
 
  constructor(
    private usuarioService: UsuarioService,
    private activeRoute: ActivatedRoute
  ){}
  ngOnInit(): void {
    this.activeRoute.paramMap.subscribe((resp: any) => {
      if(resp?.params?.id) {
        this.usuarioService.consultarUsuario = +resp.params.id;
      }
    })
  }

}
