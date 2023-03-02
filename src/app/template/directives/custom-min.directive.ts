import { Directive, Input } from '@angular/core';
import { FormControl, NG_VALIDATORS, Validator } from '@angular/forms';

// Clase cread manualmente que validará el mínimo número a ingresar en el campo precio
// Necesita declarar la directiva en el módulo a usar, en este caso en "TemplateModule"
// [customMin] : Será el nombre con el que se buscará a la directiva personalizada en el template
// [ngModel] : Indica que requerirá tener la propiedad [ngModel] dentro del formulario del elemento html
// Validator : Objeto que viene con agngular que permite hafe validaciones como: require, minlength, etc
@Directive({
  selector: '[customMin][ngModel]',
  providers: [
    {
      provide: NG_VALIDATORS,
      useExisting: CustomMinDirective,
      multi: true,
    },
  ],
})
export class CustomMinDirective implements Validator {
  // Recibiremos el "[minimo]" del padre template, el nombre tiene que coincidir
  @Input()
  minimo!: number;

  constructor() {}
  // Método necesario a implementar por la interfaz "Validator"
  // FormControl : Tipo de dato obtenido del formulario para el control de sus propiedades
  validate(control: FormControl) {
    // propiedad que contendrá el valor del input
    const inputValue = control.value;

    return inputValue < this.minimo ? { customMin: true } : null;
  }
}
