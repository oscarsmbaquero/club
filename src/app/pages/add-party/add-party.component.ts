import { Component } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms'; // Importa ReactiveFormsModule
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { PartysService } from '../../core/services/partys/partys.service';

@Component({
  selector: 'app-add-party',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './add-party.component.html',
  styleUrl: './add-party.component.css',
})
export class AddPartyComponent {
  public addParty: FormGroup;
  submitted!: boolean;

  constructor(
    private formBuilder: FormBuilder,
    private partysService: PartysService
  ) {
    this.addParty = this.formBuilder.group({
      name: ['', [Validators.required]],
      description: ['', [Validators.required]],
      fecha: ['', [Validators.required]],
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
          //console.log('Datos enviados con éxito');
          //console.log(response);
          // this.loading = false;
          // this.snackBar.open(
          //   'El producto ha sido añadido correctamente',
          //   'Cerrar',
          //   {
          //     duration: 3000,
          //   }
          // );
          //this.router.navigate(['list']);
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
