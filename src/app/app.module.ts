import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule} from "@angular/forms";
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from "./login/login.component";
import { CreateUsuario } from "./usuario/create/create.component";
import { ViewUsuario } from "./usuario/view/view.component";
import { CreateHabitacion } from "./habitacion/create/create.component";
import { getPageHabitacion } from "./habitacion/page/page.component";
import { ViewHabitacion } from "./habitacion/view/view.component";
import { EditHabitacion } from "./habitacion/edit/edit.component";
import { CreateReserva } from "./reserva/create/create.component";
import { getPageReserva } from "./reserva/page/page.component";
import {HttpClientModule} from "@angular/common/http";
import {CookieService} from "ngx-cookie-service";
import { ServiceService } from './Service/service.service';
import { EditPension } from './pension/edit/edit.component';
import { getPagePension } from './pension/page/page.component';
import { ViewPension } from './pension/view/view.component';
import { ViewTipohabitacion } from './tipohabitacion/view/view.component';
import { EditTipohabitacion } from './tipohabitacion/edit/edit.component';
import { CreatePension } from './pension/create/create.component';
import { ViewTipousuario } from './tipousuario/view/view.component';
import { Login } from './Modelo/login';
@NgModule({
  declarations: [
    AppComponent, 
    LoginComponent, 
    CreateUsuario, 
    ViewUsuario,
    getPageHabitacion,
    ViewHabitacion,
    EditHabitacion,
    CreateHabitacion,
    CreateReserva,
    getPageReserva,
    EditPension,
    getPagePension,
    ViewPension,
    ViewTipohabitacion,
    EditTipohabitacion,
    ViewTipousuario,
    CreatePension
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    FormsModule

  ],
  providers: [ServiceService, CookieService, Login],
  bootstrap: [AppComponent]
})

export class AppModule {}


