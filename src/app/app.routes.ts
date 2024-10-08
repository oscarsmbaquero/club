import { Routes } from '@angular/router';
//componentes
import { HomeComponent } from './pages/home/home.component';
import { ContactComponent } from './pages/contact/contact.component';
import { GaleryComponent } from './pages/galery/galery.component';
import { ListPriceComponent } from './pages/list-price/list-price.component';
import { PartysComponent } from './pages/partys/partys.component';

export const routes: Routes = [
    { path: '', redirectTo: '/home', pathMatch: 'full' }, // Redirigir a home por defecto
    { path: 'home', component: HomeComponent },
    { path: 'contact', component: ContactComponent },
    { path: 'gallery', component: GaleryComponent },
    { path: 'prices', component: ListPriceComponent },
    { path: 'partys', component: PartysComponent },
    { path: '**', redirectTo: '/home' } // Redirigir a home para cualquier ruta no encontrada (404)
];
