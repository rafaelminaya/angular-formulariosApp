import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'template', // http://localhost:4200/template/basicos
    loadChildren: () =>
      import('./template/template.module').then((m) => m.TemplateModule),
  },
  {
    path: 'reactive', // http://localhost:4200/reactive/basicos
    loadChildren: () =>
      import('./reactive/reactive.module').then((m) => m.ReactiveModule),
  },
  {
    path: '**',
    redirectTo: 'template',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
