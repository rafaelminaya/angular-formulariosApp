import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-switches',
  templateUrl: './switches.component.html',
  styles: [],
})
export class SwitchesComponent implements OnInit {
  // PROPIEDADES
  // Definimos la propiedad que representa al formulario y definimos e inicializamos sus propiedades
  miFormulario: FormGroup = this.formBuilder.group({
    genero: ['M', Validators.required],
    notificaciones: [false, Validators.required],
    // requiredTrue : Recomendado para booleanos, con el fin de especificar que se requiere un true
    condiciones: [false, Validators.requiredTrue],
  });

  // propiedad para luego usarla para inicializar los valores del formulario
  persona = {
    genero: 'F',
    notificaciones: true,
  };
  // CONSTRUCTOR
  constructor(private formBuilder: FormBuilder) {}

  // MÉTODOS
  /*
  - Por medio del método "ngOnInit()" se inicializarán los valores del formulario.
  - Esta inicialización  tiene mayor prioridad que al de definirse el formulario
  - Inicializamos las propiedades del formularios con las que reciba del objeto "persona"
  */
  ngOnInit(): void {
    // 1° Opción - setValue()
    // this.miFormulario.setValue(this.persona);

    // 2° Opción - reset()
    this.miFormulario.reset({ ...this.persona, condiciones: false });

    // RXJS - Desde aquí hasta acabar el método "ngOnInit()" sincronizar el objeto "persona" con el formulario, esto es opcional y no se suele usar tanto.
    /*valueChanges :
    - Es un observable de tipo "any" que sirve para suscribirmos a los cambios del formulario
    - También permite suscribirmos al cambio de un campo en específico del formulario
    */
    // 1° Opción - Eliminando la propiedad "condiciones" con "delete"
    this.miFormulario.valueChanges.subscribe((form) => {
      console.log('formulario', form);
      // borro la propiedad "condiciones" del formulario obtenido ya que esa propiedad no la tiene el objeto "persona" inicialmente
      delete form.condiciones;
      this.persona = form;
    });

    // 2° Opción - desestructurando el argumento para utilizar todos las propiedades del formulario excepto "condiciones"
    /*
    this.miFormulario.valueChanges.subscribe(({ condiciones, ...restoDeArgumentos }) => {
      this.persona = restoDeArgumentos;
    });
    */

    this.miFormulario.controls['condiciones'].valueChanges.subscribe(
      (newValue) => {
        console.log('condiciones ', newValue);
      }
    );

    this.miFormulario.get('genero')?.valueChanges.subscribe((newValue) => {
      console.log('genero ', newValue);
    });
  }

  guardar() {
    console.log(this.miFormulario.value);
    // creamos una constante con los últimos valores del formulario
    const formValue = { ...this.miFormulario.value };
    // eliminamos la propiedad condiciones que no necesitamos
    // delete;: Es propio de JS para eliminar algo
    delete formValue.condiciones;

    // console.log(formValue);

    this.persona = formValue;
  }
}
