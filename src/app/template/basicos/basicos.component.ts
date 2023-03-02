import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-basicos',
  templateUrl: './basicos.component.html',
  styles: [],
})
export class BasicosComponent implements OnInit {
  // Asignamos el elemento html con la referencia local #miFormulario a la proiedad "formularioTemplate" de esta componente
  // Con "!" ya que siempre tendrá un valor, que se va a inicializar después del "ngOnInit()"
  // NgForm; :Tipo de dato obtenido al imprimirlo en consola.

  @ViewChild('miFormulario')
  formularioTemplate!: NgForm;

  // propiedad para establecer los valores iniciales del formulario
  initForm = {
    producto: 'RTX 4080 TI',
    precio: 10,
    existencias: 10,
  };

  constructor() {}

  ngOnInit(): void {}

  // Validación del formulario desde el componente
  nombreValido(): boolean {
    //this.formularioTemplate? : Validaremos que obtenga los valores solo si existe "this.miFormulario?", el cual se obtendrá luego de renderizar el template
    return (
      this.formularioTemplate?.form.controls['producto']?.invalid &&
      this.formularioTemplate?.form.controls['producto']?.touched
    );
  }

  precioValido(): boolean {
    //this.miFormulario? : Validaremos que obtenga los valores solo si existe "this.miFormulario?", el cual se obtendrá luego de renderizar el template
    return (
      this.formularioTemplate?.form.controls['precio']?.touched &&
      this.formularioTemplate?.form.controls['precio']?.value < 0
    );
  }

  // NgForm : Es el tipo de dato que visualizaremos en la consola del navegador al imprimir lo recibido por el formulario.
  // De esta forma podemos acceder a sus propiedades en vez de poner el tipo "any"
  // Importado de '@angular/forms'
  /*
  guardar(miFormulario: NgForm) {
    console.log(miFormulario);
  }
  */
  guardar() {
    console.log('Posteo correcto');
    // console.log(this.formularioTemplate);
    // Reinicio los valores al formulario, incluyendo sus estados(touched, pristine, etc)
    // 1° opción
    // this.formularioTemplate.resetForm();
    //2° opción - Adicionalmente personalizo los valores de cada campo
    this.formularioTemplate.resetForm({
      producto: 'Algo',
      precio: 0,
      existencias: 0,
    });
  }
}
