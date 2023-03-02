import { Component, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';

interface Persona {
  nombre: string;
  favoritos: Favorito[];
}

interface Favorito {
  id: number;
  nombre: string;
}

@Component({
  selector: 'app-dinamicos',
  templateUrl: './dinamicos.component.html',
  styles: [],
})
export class DinamicosComponent {
  nuevoJuego: string = '';
  // PROPIEDADES
  persona: Persona = {
    nombre: 'Fernando',
    favoritos: [
      {
        id: 1,
        nombre: 'Metal Gear',
      },
      {
        id: 2,
        nombre: 'death stranding',
      },
    ],
  };

  // MÉTODOS

  agregarJuego() {
    const nuevoFavorito: Favorito = {
      id: this.persona.favoritos.length + 1,
      nombre: this.nuevoJuego,
    };

    // operador spread para esparcir sus propiedades y asegurarme de no mandar referencia al objeto
    this.persona.favoritos.push({ ...nuevoFavorito });
    this.nuevoJuego = '';
  }
  guardar() {
    console.log('formulario posteado');
  }

  eliminar(index: number) {
    this.persona.favoritos.splice(index, 1);
  }
}
