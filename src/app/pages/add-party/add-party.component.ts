import { Component, ChangeDetectionStrategy } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms'; // Importa ReactiveFormsModule
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { PartysService } from '../../core/services/partys/partys.service';
//input fecha
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {provideNativeDateAdapter} from '@angular/material/core';

@Component({
  selector: 'app-add-party',
  standalone: true,
  providers: [provideNativeDateAdapter()],
  imports: [ReactiveFormsModule, MatDatepickerModule, MatInputModule, MatFormFieldModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './add-party.component.html',
  styleUrl: './add-party.component.css',
})
export class AddPartyComponent {
  public addParty: FormGroup;
  submitted!: boolean;

  constructor(
    private formBuilder: FormBuilder,
    private partysService: PartysService,
    private router: Router
  ) {
    this.addParty = this.formBuilder.group({
      name: ['', [Validators.required]],
      description: ['', [Validators.required]],
      fecha: [''],
      image: [''],
    });
  }

  public onSubmit(): void {
    this.submitted = true;
    if (this.addParty.valid) {
      //TODO TIPAR
      const newParty: any = {
        name: this.addParty.get('name')?.value,
        description: this.addParty.get('description')?.value,
        fecha: this.addParty.get('fecha')?.value,
        image: this.addParty.get('image')?.value,
      };
      console.log(newParty);
      this.partysService.addParty(newParty).subscribe(
        (response: any) => {
          this.router.navigate(['partys'])
        },
        (error) => {
          console.error('Error al enviar los datos', error);
        }
      );
    }
  }

  /**
   * Añadir la imagen
   * @param event
   */
  onFileSelected(event: any) {
    const file: File = event.target.files[0];
    //console.log(file, 61);
    this.addParty.get('image')?.setValue(file);
  }
}
