import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ValidatorService } from '../../../shared/validator/validator.service';
import { EmailValidatorService } from '../../../shared/validator/email-validator.service';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styles: [],
})
export class RegistroComponent implements OnInit {
  // PROPIEDADES

  miFormulario: FormGroup = this.formBuilder.group(
    // PRIEMER Objeto del FormGroup
    {
      // pattern() : Permite indicar una validación regex(expresión regular)
      nombre: [
        '',
        [
          Validators.required,
          Validators.pattern(this.validatorService.nombreApellidoPattern),
        ],
      ],
      // 1° Opción - Usando Validators.email - No recomendado ya que no es preciso
      // email: ['', [Validators.required, Validators.email]],

      // 2° Opción - Usando regex(expresión regular) - Recomendado porque es más personalizable
      email: [
        '',
        [
          Validators.required,
          Validators.pattern(this.validatorService.emailPattern),
        ],
        [this.emailValidatorService],
      ],
      username: [
        '',
        [Validators.required, this.validatorService.noPuedeSerStrider],
      ],
      password: ['', [Validators.required, Validators.minLength(6)]],
      password2: ['', [Validators.required]],
    },
    {
      /*
      - SEGUNDO objeto del FormGroup
      
      - Acá podemos añadir más opciones al FormGroup, como validadors síncronos(normales) y asíncronos
      - camposIguales('password', 'password2') : De esta forma indicaremos el nombre de las 2 propiedades 
      a enviar en el método "camposIguales" por referencia (ya que no se ejecuta al no tener paréntesis)
      */
      validators: [
        this.validatorService.camposIguales('password', 'password2'),
      ],
    }
  );

  // GETTER
  // Opción 2 de validación - SÍ LA USAMOS
  // El getter se va a ejecutar siempre y cuando Angular detecte un cambio en el componente
  get emailErrorMsg() {
    console.log('go');
    // Almacenamos los errores de la propiedad "email" del formulario
    const errors = this.miFormulario.get('email')?.errors;

    // Según el error devolvemos el mensaje correspondiente
    if (errors?.['required']) {
      return 'Email es obligatorio';
    } else if (errors?.['pattern']) {
      return 'El valor ingresado no tiene formato de correo';
    } else if (errors?.['emailTomado']) {
      return 'El email ya fue tomado';
    }
    return '';
  }

  // CONSTRUCTOR
  constructor(
    private formBuilder: FormBuilder,
    private validatorService: ValidatorService,
    private emailValidatorService: EmailValidatorService
  ) {}

  // MÉTODOS
  ngOnInit(): void {
    this.miFormulario.reset({
      nombre: 'Fernando Herrera',
      email: 'test1@test.com',
      username: 'fernando_her85',
      password: '123456',
      password2: '123456',
    });
  }

  // Validación para que verifique que el campo es inválido y a la vez tocado (touched)
  campoNoValido(campo: string) {
    return (
      this.miFormulario.get(campo)?.invalid &&
      this.miFormulario.get(campo)?.touched
    );
  }

  // Opción 1 de validación - NO USADASS
  /*
  emailRequired() {
    return (
      this.miFormulario.get('email')?.errors?.['required'] &&
      this.miFormulario.get('email')?.touched
    );
  }

  emailFormato() {
    return (
      this.miFormulario.get('email')?.errors?.['pattern'] &&
      this.miFormulario.get('email')?.touched
    );
  }

  emailTomado() {
    return (
      this.miFormulario.get('email')?.errors?.['emailTomado'] &&
      this.miFormulario.get('email')?.touched
    );
  }
  */

  submitFormulario() {
    console.log(this.miFormulario);

    this.miFormulario.markAllAsTouched();
  }
}
