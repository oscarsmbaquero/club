import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule  } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { Router } from '@angular/router';
//servicios
import { UsersService } from '../../core/services/users/users.service';
import { NotificationService } from '../../core/services/notificationService/notificationService';
//componentes
import { LoadingComponent } from '../../shared/components/loading/loading/loading.component';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule, MatCardModule, MatInputModule, MatButtonModule, LoadingComponent],
  templateUrl: './register.component.html',
  styleUrl: '../auth-styles.css',
})
export class RegisterComponent {
  registerForm: FormGroup;
  loading = false;

  constructor(
    private fb: FormBuilder,
    private usersService: UsersService,
    private router: Router,
    private notificationService: NotificationService
  ) {
    this.registerForm = this.fb.group({
      user: ['', [Validators.required]],
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
      this.loading = true;
      // Crear un objeto de usuario con los datos del formulario
      const user: any = {
        user: this.registerForm.get('user')?.value,
        mail: this.registerForm.get('email')?.value,
        password: this.registerForm.get('password')?.value,
      };
      this.usersService.register(user).subscribe(
        (response) => {
          this.loading = false;
          this.notificationService.showNotification(
            'success',
            `Usuario registrado correctamente`
          );

          setTimeout(() => {
            this.router.navigate(['/login'])  
          },);
          
        },
        (error) => {
          // Manejo del error que envía el servidor
          if (error.status === 500) {
            this.loading = false;
            this.notificationService.showNotification(
              'error',
              'Este mail ya esta regitrado en nuestro sistema'
            );
            // this.loading = false;
          }
        }
      );
    }else{
      this.registerForm.markAllAsTouched();
    }
  }
  }

