import { Component } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormGroup,
  Validators,
  FormControl,
} from '@angular/forms';

@Component({
  selector: 'app-dinamicos',
  templateUrl: './dinamicos.component.html',
  styles: [],
})
export class DinamicosComponent {
  // PROPIEDADES
  // Propiedad que representa el formulario y sus campos
  miFormulario: FormGroup = this.formBuilder.group({
    nombre: [, [Validators.required, Validators.minLength(3)]],
    favoritos: this.formBuilder.array(
      // Dentro del arreglo se asigna cada uno de los elementos.
      // Estos puede ser asignados con el "control()" del "FormBuilder" o como un arreglo
      [
        this.formBuilder.control('Metal Gear', Validators.required),
        ['Death Starnsing', Validators.required],
      ],
      Validators.required
    ),
  });

  // Propiedad aislada para evaluar el nuevo favorito a agregar
  nuevoFavorito: FormControl = this.formBuilder.control(
    '',
    Validators.required
  );

  // GETTER
  get favoritosArr() {
    // "this.miFormulario.get('favoritos')" es una alternativa a  "this.miFormulario.controls['favoritos']"
    // Con "as" parsea lo indicado al tipo "FormArray" y así obtener la propiedad "controls" en el template
    return this.miFormulario.get('favoritos') as FormArray;
  }

  // CONSTRUCTOR
  constructor(private formBuilder: FormBuilder) {}

  // MÉTODOS
  campoNoEsValido(campo: string) {
    return (
      this.miFormulario.controls[campo].errors &&
      this.miFormulario.controls[campo].touched
    );
  }

  agregar() {
    if (this.nuevoFavorito.invalid) {
      return;
    }

    // 1° Opción - FormControl
    /*
    this.favoritosArr.push(
      new FormControl(this.nuevoFavorito.value, Validators.required)
    );
    */

    // 2° Opción - FormBuilder
    this.favoritosArr.push(
      // validación al momento de agregarse al arreglo
      this.formBuilder.control(this.nuevoFavorito.value, Validators.required)
    );

    this.nuevoFavorito.reset();
  }

  guardar() {
    if (this.miFormulario.invalid) {
      this.miFormulario.markAllAsTouched();
      return;
    }

    console.log(this.miFormulario.value);
    this.miFormulario.reset();
  }

  borrar(index: number) {
    // 1° Opción
    // this.favoritosArr.removeAt(index);

    // 2° Opción
    this.favoritosArr.controls.splice(index, 1);
  }
}
