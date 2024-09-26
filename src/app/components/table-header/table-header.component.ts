import { Component, EventEmitter, Output } from '@angular/core';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { debounceTime } from 'rxjs';

@Component({
  selector: 'app-table-header',
  standalone: true,
  imports: [RouterLink, ReactiveFormsModule],
  templateUrl: './table-header.component.html',
  styleUrl: './table-header.component.css'
})
export class TableHeaderComponent {
  @Output() onSearch = new EventEmitter<string>();

  controlSearch = new FormControl('', [Validators.minLength(3)]);
  constructor() {
    this.controlSearch.valueChanges.pipe(debounceTime(500)).subscribe((resp) => {
      if(typeof resp === 'string' && this.controlSearch.valid) {
        this.onSearch.emit(resp);
      }
    })
  }
}
