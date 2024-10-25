import { Routes } from '@angular/router';
//componentes
import { HomeComponent } from './pages/home/home.component';
import { ContactComponent } from './pages/contact/contact.component';
import { GaleryComponent } from './pages/galery/galery.component';
import { ListPriceComponent } from './pages/list-price/list-price.component';
import { PartysComponent } from './pages/partys/partys.component';
import { AddPartyComponent } from './pages/add-party/add-party.component';
import { TarifasComponent } from './pages/tarifas/tarifas.component';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { ResetPasswordComponent } from './auth/reset-password/reset-password.component';
import { NewPasswordComponent } from './auth/new-password/new-password.component';
import { ClientsComponent } from './pages/clients/clients/clients.component';

export const routes: Routes = [
    { path: '', redirectTo: '/home', pathMatch: 'full' }, 
    { path: 'home', component: HomeComponent },
    { path: 'contact', component: ContactComponent },
    { path: 'gallery', component: GaleryComponent },
    { path: 'prices', component: ListPriceComponent },
    { path: 'partys', component: PartysComponent },
    { path: 'add/party', component: AddPartyComponent },
    { path: 'tarifas', component: TarifasComponent },
    { path: 'login', component: LoginComponent },
    { path: 'register', component: RegisterComponent },
    { path: 'reset-password', component: ResetPasswordComponent },
    { path: 'new-password/:token', component: NewPasswordComponent },
    { path: 'clients', component: ClientsComponent },
    { path: '**', redirectTo: '/home' } 
];
