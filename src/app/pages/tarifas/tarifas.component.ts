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

  cardsTarifas = [
    {
      src: "https://res.cloudinary.com/de3ujeyub/image/upload/v1730479636/samples/outdoor-woman.jpg",
      name:"Chicos",
      description: [
        " Domingo a miércoles – 50€ – 1 copa y uso completo instalaciones.",
        "Jueves – 30€ – 2 copas y acceso a zona común. Acceso completo a instalaciones supervisado por encargado de sala (+50€)",
        "Vísperas de festivo – 80€ – 2 copas y uso completo instalaciones.",
        "Entrada selectiva bajo supervisión de encargado de sala."
      ]
    },
    {
      src: "https://res.cloudinary.com/de3ujeyub/image/upload/v1730543117/art-tude-oficial-GmeefQOdKZc-unsplash_kfuuvr.jpg",
      name:"Chicas",
      description: [
        " De domingo a jueves – 10€ – 1 copa y uso completo de instalaciones.",
        "Viernes y sábados – 20€ – 1 copa y uso completo de instalaciones.",
      ]
    },
    {
      src: "https://res.cloudinary.com/de3ujeyub/image/upload/v1730543258/katarzyna-grabowska-oA1-rirIJ2E-unsplash_eugqyp.jpg",
      name:"Trios",
      description: [
        "Domingo a miércoles 100€ – 5 copas",
        " Jueves – 130€ – 6 copas",
        "Pareja y un chica",
        "Viernes y sábado 100€ – 6 copas.",
        "Domingo a jueves 70€ – 6 copas"
      ]
    },
    {
      src: "https://res.cloudinary.com/de3ujeyub/image/upload/v1730543183/roman-khripkov-HxIJP-yFLyQ-unsplash_erzuxg.jpg",
      name:"Parejas",
      description: [
        "De domingo a jueves – 50€ – 4 copas",
        "Viernes – 60€ – 4 copas",
        "Sábado – 70€ – 4 copas",
        "Víspera de festivo: 50€ con 4 copas y uso completo de instalaciones."
      ]
    }
  ]

}
