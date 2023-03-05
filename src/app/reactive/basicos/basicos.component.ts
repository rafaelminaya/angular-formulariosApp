import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-basicos',
  templateUrl: './basicos.component.html',
  styles: [],
})
export class BasicosComponent implements OnInit {
  // 1° Opción - FormGroup
  /*
  miFormulario: FormGroup = new FormGroup({
    // nombre: Es un control,  sería el "name" campo del formualrio
    // FormControl('') : El valor que va tener el campo en el formulario
    nombre: new FormControl('RTX 4080 TI'),
    precio: new FormControl(1500),
    existencias: new FormControl(5),
  });
  */

  // 2° Opción - FormGroup - FormBuilder
  // Creamos un objeto para acceder al formulario y sus campos en el template
  miFormulario: FormGroup = this.formBuilder.group({
    // ['RTX 4080 TI'] :  La definición del valor va como un arreglo, ya que se le pueden añadir validaciones síncronas y validaciones asíncronas
    // Las validació síncrona debe ser el segundo elemento del arreglo, si son varias, deben estar dentro de un arreglo
    nombre: [, [Validators.required, Validators.minLength(3)]],
    precio: [, [Validators.min(0), Validators.required]],
    existencias: [, [Validators.min(0), Validators.required]],
  });

  constructor(private formBuilder: FormBuilder) {}

  // Inicializamos valores del formulario, en este caso de forma opcional con el método "ngOnInit()".
  // Para este caso, se necesita inicializar todos los valores del formulario
  // Como alternativa en vez de "setValue()" podemos usar "reset()"
  // Se pueden incializar los valores sea en el método "ngOnInit()" o en la declaración dentro del "FormGroup"
  ngOnInit(): void {
    this.miFormulario.setValue({
      nombre: 'RTX 4080 TI',
      precio: 1600,
      existencias: 10,
    });
  }

  // MÉTODOS
  // Validación dinámica, ya que se evalua un campo recibido, enlazado con el objeto(nombre, precio, existencias) dentro del "FormGroup" y sus validaciones
  campoNoEsValido(campo: string) {
    return (
      this.miFormulario.controls[campo].errors &&
      this.miFormulario.controls[campo].touched
    );
  }
  guardar() {
    if (this.miFormulario.invalid) {
      // markAllAsTouched() : Método que toca /touch todos los campos del formulario, disparando las validaciones con "touched"
      this.miFormulario.markAllAsTouched();
      return;
    }

    // Reinicio del formulario, no a como fue inicializdo, sino borrando todos los valores y reiniciadno estados (touched, pristine)
    this.miFormulario.reset();
  }
}
