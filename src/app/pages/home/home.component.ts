import { AfterViewInit, Component, HostListener, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import * as AOS from 'aos';
declare var Parallax: any;

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

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
