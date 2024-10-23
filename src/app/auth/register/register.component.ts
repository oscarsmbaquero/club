import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule  } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { Router } from '@angular/router';
//servicios
import { UsersService } from '../../core/services/users/users.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule, MatCardModule, MatInputModule, MatButtonModule],
  templateUrl: './register.component.html',
  styleUrl: '../auth-styles.css',
})
export class RegisterComponent {
  registerForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private usersService: UsersService,
    private router: Router
  ) {
    this.registerForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', [Validators.required]],
    }, {
      validators: this.passwordMatchValidator
    });
  }
  
  /**
   * Funcion para validar la password
   * @param form 
   * @returns 
   */
  passwordMatchValidator(form: FormGroup) {
    return form.get('password')?.value === form.get('confirmPassword')?.value
      ? null : { mismatch: true };
  }

  onSubmit() {
    if (this.registerForm.valid) {      
      // Crear un objeto de usuario con los datos del formulario
      const user: any = {
        mail: this.registerForm.get('email')?.value,
        password: this.registerForm.get('password')?.value,
      };
      this.usersService.register(user).subscribe(
        (response) => {
            console.log(response);

          setTimeout(() => {
            this.router.navigate(['/login'])  
          }, 1000);
          
        },
        (error) => {
          // Manejo del error que envía el servidor
          if (error.status === 500) {
            // this.notificationService.showNotification(
            //   'error',
            //   'Este mail ya esta regitrado en nuestro sistema'
            // );
            // this.loading = false;
          }
        }
      );
    }else{
      this.registerForm.markAllAsTouched();
    }
  }
  }

