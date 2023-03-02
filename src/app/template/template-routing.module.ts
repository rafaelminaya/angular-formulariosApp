import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { BasicosComponent } from './basicos/basicos.component';
import { DinamicosComponent } from './dinamicos/dinamicos.component';
import { SwitchesComponent } from './switches/switches.component';

const routes: Routes = [
  {
    path: '',
    children: [
      { path: 'basicos', component: BasicosComponent }, // http://localhost:4200/template/basicos
      { path: 'dinamicos', component: DinamicosComponent }, // http://localhost:4200/template/dinamicos
      { path: 'switches', component: SwitchesComponent }, // http://localhost:4200/template/switches
      { path: '**', redirectTo: 'basicos' },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TemplateRoutingModule {}
