import { Injectable } from '@angular/core';
import { AbstractControl, FormControl, ValidationErrors } from '@angular/forms';

@Injectable({
  providedIn: 'root',
})
export class ValidatorService {
  // PROPIEDADES
  nombreApellidoPattern: string = '([a-zA-Z]+) ([a-zA-Z]+)';
  emailPattern: string = '^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$';

  // CONSTRUCTOR
  constructor() {}

  // MÉTODOS
  // ValidationErrors : Tipo de dato para los métodos con validaciones personalizadas.
  // | null : Indicamos que podría ser null ya que en caso no encuentre errores, estamos devolviendo null al final del método
  noPuedeSerStrider(control: FormControl): ValidationErrors | null {
    // obtenemos el valor del argumento/control y lo asignamos a una constante
    const valor: string = control.value?.trim().toLowerCase();

    // Condicionamos a que si el valor recibido es igual a "strider" devuelva un error
    if (valor === 'strider') {
      // Al devolver un objeto cualquiera con un valor, ya es considerado que estamos deolviendo un error
      return {
        noStrider: true,
      };
    }

    // Al devolver "null" indicamos que no hay errores
    return null;
  }

  // Devolvemos una función ya que al invocarse se usa la referencia sin ejecutarse
  // El argumento del método es la representación de los campos del formulario
  camposIguales(campo1: string, campo2: string) {
    return (formGroup: AbstractControl): ValidationErrors | null => {
      // Obtenemos los valores de ambos campos del formulario a recibir
      const pass1 = formGroup.get(campo1)?.value;
      const pass2 = formGroup.get(campo2)?.value;

      // Retornamos un objeto cualquiera, significa que hubo error
      // Si retornamos "null" significa que no hubo errores
      if (pass1 !== pass2) {
        // Establecemos un error para el campo que representa el repetir contraseña
        formGroup.get(campo2)?.setErrors({ noIguales: true });
        return {
          noIguales: true,
        };
      }

      // Quitamos todos los errores en el campo de repretir contraseña
      formGroup.get(campo2)?.setErrors(null);
      return null;
    };
  }
}
