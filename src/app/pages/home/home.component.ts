import { Component, OnInit } from '@angular/core';
import { TableHeaderComponent } from '../../components/table-header/table-header.component';
import { TableContentComponent } from '../../components/table-content/table-content.component';
import { UsuarioService } from '../../../services/usuarios.service';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { debounceTime } from 'rxjs';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [TableHeaderComponent, TableContentComponent, ReactiveFormsModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent implements OnInit {

  formPaginationControl: FormGroup;
  constructor(private fb: FormBuilder, private usuarioService: UsuarioService) {
    this.formPaginationControl = this.fb.group({
      keyword: [''],
      page: [1],
      pageSize: [10],
    });
    this.formPaginationControl.valueChanges
      .pipe(debounceTime(700))
      .subscribe((resp) => {
        this.usuarioService.consultaPaginado(resp);
      });
  }

  ngOnInit(): void {
    this.usuarioService.consultaPaginado(this.formPaginationControl.value);
  }

  buscar($event: string) {
    this.formPaginationControl.get('keyword')?.patchValue($event);
  }

  paginaSiguiente() {
    const page = +this.formPaginationControl.get('page')?.value
    this.formPaginationControl.get('page')?.patchValue(page+1);
  }

  paginaAnterior() {
    const page = +this.formPaginationControl.get('page')?.value
    let anterior = page - 1;
    if(anterior <= 0) anterior = 1;
    this.formPaginationControl.get('page')?.patchValue(anterior);
  }
}
