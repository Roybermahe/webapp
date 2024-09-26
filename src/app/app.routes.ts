import { Routes } from '@angular/router';

export const routes: Routes = [
    { path: '', redirectTo: 'home', pathMatch: 'full' },
    { path: 'home', loadChildren: () => import('./pages/home/home.routes').then(r => r.routes) },
    { path: 'guardar', loadChildren: () => import('./pages/guardar/guardar.routes').then(r => r.routes) },
    { path: 'editar/:id', loadChildren: () => import('./pages/editar/editar.routes').then(r => r.routes) },
    { path: 'detalle/:id', loadChildren: () => import('./pages/detalle/detalle.routes').then(r => r.routes) },
];
