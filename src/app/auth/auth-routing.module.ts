import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LoginComponent } from './pages/login/login.component';
import { RegistroComponent } from './pages/registro/registro.component';

const routes: Routes = [
  {
    path: '',
    children: [
      { path: 'login', component: LoginComponent }, // http://localhost:4200/reactive/auth/login
      { path: 'registro', component: RegistroComponent }, // http://localhost:4200/reactive/auth/registro
      { path: '**', redirectTo: 'registro' },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AuthRoutingModule {}
