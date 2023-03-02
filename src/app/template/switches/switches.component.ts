import { Component } from '@angular/core';

@Component({
  selector: 'app-switches',
  templateUrl: './switches.component.html',
  styles: [],
})
export class SwitchesComponent {
  // PROPIEDADES
  persona = {
    genero: 'F',
    notificaciones: true,
  };

  terminosYCondiciones: boolean = false;
}
