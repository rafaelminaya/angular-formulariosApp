import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  AbstractControl,
  AsyncValidator,
  ValidationErrors,
} from '@angular/forms';
import { delay, map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
// AsyncValidator : Interfaz necesaria de implementar para las validaciones asíncronas con el componente donde se encuentre el formulario
export class EmailValidatorService implements AsyncValidator {
  // CONSTRUCTOR
  constructor(private http: HttpClient) {}

  // MÉTODOS
  // Método implementado por AsyncValidator
  // ValidationErrors : Tipo que retorna respuestas similares a { noIgual: true } en caso haya un error
  // Este método si retorna "null" significa que no hay errores
  validate(
    control: AbstractControl
  ): Promise<ValidationErrors | null> | Observable<ValidationErrors | null> {
    const email = control.value;
    console.log(email);
    return this.http
      .get<any[]>(`http://localhost:3000/usuarios?q=${email}`)
      .pipe(
        // delay(3000),
        map((response) => {
          // Si la repuesta es un arreglo vacío, devuelvo "null" que representa que no hubo error
          // de lo contrario un objeto que significa que hubo un error
          return response.length === 0 ? null : { emailTomado: true };
        })
      );
  }

  // Método implementado por AsyncValidator - Ni lo tocaremos
  registerOnValidatorChange?(fn: () => void): void {
    throw new Error('Method not implemented.');
  }
}
