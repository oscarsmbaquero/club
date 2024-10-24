import { AfterViewInit, Component, HostListener, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CarouselModule } from 'primeng/carousel';
import { CardModule } from 'primeng/card';
import { trigger, state, style, animate, transition } from '@angular/animations';
import * as AOS from 'aos';
declare var Parallax: any;

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule,CarouselModule, CardModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
  animations: [
    trigger('zoomIn', [
      state('void', style({ transform: 'scale(0.5)', opacity: 0 })),
      transition(':enter', [
        animate('500ms ease-out', style({ transform: 'scale(1)', opacity: 1 }))
      ])
    ])
  ]
})
export class HomeComponent {

  services = [
    { name: 'Servicio 1', description: 'Descripción del servicio 1', icon: 'pi pi-chart-line' },
    { name: 'Servicio 2', description: 'Descripción del servicio 2', icon: 'pi pi-cog' },
    { name: 'Servicio 3', description: 'Descripción del servicio 3', icon: 'pi pi-globe' }
  ];

  testimonials = [
    { name: 'Cliente 1', message: 'Excelente servicio, ¡lo recomiendo mucho!' },
    { name: 'Cliente 2', message: 'La plataforma es intuitiva y fácil de usar.' },
    { name: 'Cliente 3', message: 'Una experiencia única, volveré a usarla.' }
  ];

  images: string[] = [
    'https://res.cloudinary.com/dcfk8yjwr/image/upload/v1682962071/gi5qvq7ue2p5nvpqm7an.jpg',
    // 'public/images/fiesta2.jpg',
    // 'public/images/fiesta3.jpg',
  ];

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    console.log(this.images);
    
    
  }

  ngAfterViewInit(): void {
    setTimeout(() => {
      AOS.refresh()
    }, 500)
  }
}
