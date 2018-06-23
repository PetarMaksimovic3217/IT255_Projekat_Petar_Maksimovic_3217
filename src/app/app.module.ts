import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {RegisterService} from "./services/register.service";
import {LoginService} from "./services/login.service";
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { AddBrodComponent } from './add-brod/add-brod.component';
import { AddKategorijaComponent } from './add-kategorija/add-kategorija.component';
import { AddModelComponent } from './add-model/add-model.component';
import { AddSlikaComponent } from './add-slika/add-slika.component';
import { AddProizvodjacComponent } from './add-proizvodjac/add-proizvodjac.component';
import { OnamaComponent } from './onama/onama.component';
import { AppRoutingModule } from './app-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { AddDestinacijaComponent } from './add-destinacija/add-destinacija.component';
import { DestinacijeComponent } from './destinacije/destinacije.component';
import { BrodComponent } from './brod/brod.component';
import { YourReservationsComponent } from './your-reservations/your-reservations.component';
import {AdminServicesService} from "./services/admin-services.service";
import {UserService} from "./services/user.service";
import {SharedService} from "./services/shared.service";
import {ManufacturerService} from "./services/manufacturer.service";
import {ModelService} from "./services/model.service";
import {SlikaService} from "./services/slika.service";
import {DestinationService} from "./services/destination.service";
import {BoatService} from "./services/boat.service";
import { DestinacijaComponent } from './destinacija/destinacija.component';
import { ReservationComponent } from './reservation/reservation.component';
import {KorpaService} from "./services/korpa.service";
import { SearchDestinationPipe } from './search-destination.pipe';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    HeaderComponent,
    FooterComponent,
    AddBrodComponent,
    AddKategorijaComponent,
    AddModelComponent,
    AddSlikaComponent,
    AddProizvodjacComponent,
    OnamaComponent,
    AddDestinacijaComponent,
    DestinacijeComponent,
    BrodComponent,
    YourReservationsComponent,
    DestinacijaComponent,
    ReservationComponent,
    SearchDestinationPipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
     ReactiveFormsModule,
     HttpModule,
      FormsModule
  ],
  providers: [LoginService,RegisterService,AdminServicesService,UserService,SharedService,ManufacturerService,ModelService,SlikaService,DestinationService,BoatService,KorpaService],
  bootstrap: [AppComponent]
})
export class AppModule { }
