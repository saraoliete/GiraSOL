import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from "./login/login.component";
import { CreateUsuario } from "./usuario/create/create.component";
import { CreateHabitacion } from "./habitacion/create/create.component";
import { getPageHabitacion } from "./habitacion/page/page.component";
import { ViewHabitacion } from "./habitacion/view/view.component";
import { EditHabitacion } from "./habitacion/edit/edit.component";
import { CreateReserva } from "./reserva/create/create.component";
import { ViewReserva } from "./reserva/view/view.component";
import {ServiceService} from "./Service/service.service"
import {HttpClientModule} from "@angular/common/http";
import {CookieService} from "ngx-cookie-service";

@NgModule({
  declarations: [
    AppComponent, 
    LoginComponent, 
    CreateUsuario, 
    getPageHabitacion,
    ViewHabitacion,
    EditHabitacion,
    CreateHabitacion,
    CreateReserva,
    ViewReserva
  ],
  imports: [
    BrowserModule,
    AppRoutingModule, 
    FormsModule,
    HttpClientModule
  ],
  providers: [ServiceService, CookieService],
  bootstrap: [AppComponent]
})

export class AppModule {}


