import { Component } from '@angular/core';

import { trigger, transition, style, animate } from '@angular/animations';
import { CommonModule } from '@angular/common';
//primeng
import { PanelModule } from 'primeng/panel';
import { AvatarModule } from 'primeng/avatar';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-tarifas',
  standalone: true,
  imports: [PanelModule, AvatarModule, CommonModule, ButtonModule],
  // animations: [
  //   trigger('panelContent', [
  //     transition(':enter', [
  //       style({ opacity: 0 }),
  //       animate('0.5s', style({ opacity: 1 })),
  //     ]),
  //     transition(':leave', [
  //       animate('0.5s', style({ opacity: 0 })),
  //     ]),
  //   ]),
  // ],
  templateUrl: './tarifas.component.html',
  styleUrl: './tarifas.component.css'
})
export class TarifasComponent {

}
