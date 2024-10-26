import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { FloatLabelModule } from 'primeng/floatlabel';
import { NotificationService } from '../../core/services/notificationService/notificationService';
import { UsersService } from '../../core/services/users/users.service';
import { Router } from '@angular/router';
import { RouterModule } from '@angular/router';
import { CheckboxModule } from 'primeng/checkbox';
import { InputTextareaModule } from 'primeng/inputtextarea';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    RouterModule,
    FloatLabelModule,
    CheckboxModule,
    InputTextareaModule,
  ],
  templateUrl: './contact.component.html',
  styleUrl: '../../auth/auth-styles.css',
})
export class ContactComponent {
  contactForm: FormGroup;
  loading = false;

  constructor(
    private fb: FormBuilder,
    private notificationService: NotificationService,
    private usersService: UsersService,
    private router: Router
  ) {
    this.contactForm = this.fb.group({
      user: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      subject: ['', [Validators.required]],
      message: ['', [Validators.required]],
      policy: ['', [Validators.required]],
    });
  }

  onSubmit() {
    if (this.contactForm.valid) {
      this.loading = true;
      // Crear un objeto de usuario con los datos del formulario
      const user: any = {
        user: this.contactForm.get('user')?.value,
        mail: this.contactForm.get('email')?.value,
        subject: this.contactForm.get('subject')?.value,
        message: this.contactForm.get('message')?.value,
        policy: this.contactForm.get('policy')?.value,
      };
      console.log(user);
      
    }
  }
}
