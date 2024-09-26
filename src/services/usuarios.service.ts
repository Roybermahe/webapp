import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable, signal } from "@angular/core";
import { BehaviorSubject, debounceTime, Subject, tap } from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class UsuarioService {
    private $listaUsuarios = new BehaviorSubject([] as any[]);
    private $consultar = new Subject();
    private $crear = new Subject();
    private $borrar = new Subject();
    private $editar = new Subject();
    
    _loading = signal(false);
    _message = signal("");
    _consultado = signal(undefined);

    constructor(
        private http: HttpClient
    ) {
        this.crear();
        this.editar();
        this.borrar();
        this.consultar();
    }

    get listaUsuarios() {
        return this.$listaUsuarios.asObservable();
    }

    set crearUsuario(data: any) {
        this.$crear.next(data);
    }

    set editarUsuario(data: any) {
        this.$editar.next(data);
    }

    set borrarUsuario(id: number) {
        this.$borrar.next(id);
    }

    set consultarUsuario(id: number) {
        this.$consultar.next(id);
    }

    private crear() {
        this.$crear.pipe(
            tap(() => {
                this._loading.set(true);
                this._message.set("");
            }),
            debounceTime(500)
        ).subscribe(data => {
            this.http.post('/Usuarios', data).subscribe({
                next: (response: any) =>  {
                    this._loading.set(false);
                    this._message.set(response.message);
                },
                error: (err) =>  {
                    this._loading.set(false);
                    this._message.set(err.error.message);
                },
            })
        })
    }

    private editar() {
        this.$editar.pipe(
            tap(() => {this._loading.set(true);  this._message.set("");}),
            debounceTime(500)
        ).subscribe((data: any) => {
            this.http.put(`/Usuarios/${data.id}`, data.body).subscribe({
                next: (response: any) =>  {
                    this._loading.set(false);
                    this._message.set(response.message);
                },
                error: (err) =>  {
                    this._loading.set(false);
                    this._message.set(err.error.message);
                },
            })
        })
    }

    private borrar() {
        this.$borrar.pipe(
            tap(() => {this._loading.set(true); this._message.set("");}),
            debounceTime(500)
        ).subscribe((id: any) => {
            if(confirm('¿Estás seguro que deseas borrar este usuario?')){
                this.http.delete(`/Usuarios/${id}`).subscribe({
                    next: (response: any) =>  {
                        const usuarios = this.$listaUsuarios.getValue();
                        let index = usuarios.findIndex((u: any) => u.id === id);
                        usuarios.splice(index, 1);
                        this.$listaUsuarios.next(usuarios)
                    },
                    error: (err) =>  {
                        this._loading.set(false);
                    },
                })
            }
        })
    }

    private consultar() {
        this.$consultar.pipe(
            tap(() => {this._loading.set(true);  this._message.set("");}),
            debounceTime(500)
        ).subscribe((data: any) => {
            this.http.get(`/Usuarios/${data}`).subscribe({
                next: (response: any) =>  {
                    this._loading.set(false);
                    this._consultado.set(response.data);
                },
                error: (err) =>  {
                    this._loading.set(false);
                },
            })
        })
    }

    consultaPaginado(pagination: any) {
        const params = new HttpParams({
            fromObject: pagination
        })
        this.http.get('/Usuarios/Paginado', { params }).subscribe({
            next: (response: any) => {
                this.$listaUsuarios.next(response.data);
            },
        })
    }

}