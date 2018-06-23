import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { OnamaComponent } from './onama/onama.component';
import { AddKategorijaComponent } from './add-kategorija/add-kategorija.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { AddModelComponent } from './add-model/add-model.component';
import { AddSlikaComponent } from './add-slika/add-slika.component';
import { AddProizvodjacComponent } from './add-proizvodjac/add-proizvodjac.component';
import { AddBrodComponent } from './add-brod/add-brod.component';
import { AddDestinacijaComponent } from './add-destinacija/add-destinacija.component';
import { DestinacijeComponent } from './destinacije/destinacije.component';
import { BrodComponent } from './brod/brod.component';
import { YourReservationsComponent } from './your-reservations/your-reservations.component';
import { DestinacijaComponent } from './destinacija/destinacija.component';
import { ReservationComponent } from './reservation/reservation.component';

const routes: Routes = [
  {
    path: '',
    component:OnamaComponent
  },
  {
    path:'login',
    component:LoginComponent
  },
  {
    path:'register',
    component:RegisterComponent
  },
  {
    path:'add-manufacturer',
    component:AddProizvodjacComponent
  },
  {
    path:'add-model',
    component:AddModelComponent
  },
  {
    path:'add-picture',
    component: AddSlikaComponent
  },
  {
    path:'add-boat',
    component: AddBrodComponent
  },
  {
    path:'add-destinations',
    component: AddDestinacijaComponent
  },
  {
    path:'destinations',
    component: DestinacijeComponent
  },
  {
    path:'add-category',
    component:  AddKategorijaComponent
  },
  {
    path:'boats',
    component:   BrodComponent
  },
  {
    path:'your-reservations',
    component:   YourReservationsComponent
  },
  {
    path:'destination/:id',
    component:    DestinacijaComponent
  },
  {
    path:'reservation',
    component:    ReservationComponent
  }
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [ RouterModule ]
})
export class AppRoutingModule { }
