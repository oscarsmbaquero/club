import {Component,CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CarouselModule, CarouselResponsiveOptions } from 'primeng/carousel';
import { CardModule } from 'primeng/card';
import { trigger, state, style, animate, transition } from '@angular/animations';
import { register } from 'swiper/element/bundle';
import * as AOS from 'aos';
import ScrollReveal from 'scrollreveal';

declare var Parallax: any;
register();
@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule,CarouselModule, CardModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
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

  sliderImagesDesktop = [
    "https://res.cloudinary.com/dfq4zdkea/image/upload/v1729884050/carousel1_xvtm6z.jpg",
    "https://res.cloudinary.com/dfq4zdkea/image/upload/v1729884050/carousel3_xe1u3c.jpg",
    "https://res.cloudinary.com/dfq4zdkea/image/upload/v1729884051/carousel2_hrdhmh.jpg",
    "https://res.cloudinary.com/dfq4zdkea/image/upload/v1729884051/carousel2_hrdhmh.jpg",
    "https://res.cloudinary.com/dfq4zdkea/image/upload/v1729884051/carousel2_hrdhmh.jpg",
    "https://res.cloudinary.com/dfq4zdkea/image/upload/v1729884051/carousel2_hrdhmh.jpg",
    "https://res.cloudinary.com/dfq4zdkea/image/upload/v1729884051/carousel2_hrdhmh.jpg",
    "https://res.cloudinary.com/dfq4zdkea/image/upload/v1729884051/carousel2_hrdhmh.jpg",
    "https://res.cloudinary.com/dfq4zdkea/image/upload/v1729884051/carousel2_hrdhmh.jpg",
  ]
  sliderImagesMobile = [
    "https://res.cloudinary.com/dfq4zdkea/image/upload/v1729885476/register_inzahy.jpg",
    "https://res.cloudinary.com/dfq4zdkea/image/upload/v1729885478/besoForma_oqrkh4.jpg",
    "https://res.cloudinary.com/dfq4zdkea/image/upload/v1729885476/register_inzahy.jpg",
  ]

  images: string[] = [
    'https://res.cloudinary.com/dcfk8yjwr/image/upload/v1682962071/gi5qvq7ue2p5nvpqm7an.jpg',
    // 'public/images/fiesta2.jpg',
    // 'public/images/fiesta3.jpg',
  ];
  responsiveOptions = [
    {
      breakpoint: '1024px',
      numVisible: 3,
      numScroll: 1
    },
    {
      breakpoint: '768px',
      numVisible: 2,
      numScroll: 1
    },
    {
      breakpoint: '560px',
      numVisible: 1,
      numScroll: 1
    }
  ];

  ngOnInit(): void {
    console.log(this.images);
    AOS.init({
      duration: 1000,
      easing: 'ease-in-out', 
      once: false, 
      offset: 300 
    });
    
  }

  ngAfterViewInit(): void {
    setTimeout(() => {
      AOS.refresh()
    }, 500)
  }
}
