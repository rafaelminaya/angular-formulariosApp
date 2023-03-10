import { FormControl } from '@angular/forms';

// - YA NO SUAREMOS ESTAS VALIDACIONES, EN VEZ USAREMOS EL SERVICIO "validator.service.ts"

export const nombreApellidoPattern: string = '([a-zA-Z]+) ([a-zA-Z]+)';
export const emailPattern: string = '^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$';

/*
  
  - Método personalizado para validar un campo del formulario,
  - El argumento del método será el valor que tenga el campo en la vista
  - "FormControl" tipo de dato especificado que visualizaremos si imprimimos el argumento en consola
  */
export const noPuedeSerStrider = (control: FormControl) => {
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
};
