import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from "./app.component";
import { LoginComponent } from "./login/login.component";
import { RegisterUsuario } from "./usuario/register/create.component";
import { ViewUsuario } from './usuario/view/view.component';
import { CreateHabitacion } from './habitacion/create/create.component';
import { getPageHabitacion } from "./habitacion/page/page.component";
import { ViewHabitacion } from "./habitacion/view/view.component";
import { EditHabitacion } from "./habitacion/edit/edit.component";
import { CreateReserva } from './reserva/create/create.component';
import { getPageReserva } from './reserva/page/page.component';
import { EditPension } from './pension/edit/edit.component';
import { getPagePension } from './pension/page/page.component';
import { ViewPension } from './pension/view/view.component';
import { CreatePension } from './pension/create/create.component';
import { EditUsuario } from './usuario/edit/edit.component';
import { EditTipohabitacion } from './tipohabitacion/edit/edit.component';
import { getPageTipohabitacion } from './tipohabitacion/page/page.component';
import {UploadFile} from './file/upload/upload.component';
import { EditReserva } from './reserva/edit/edit.component';
import { ViewReserva } from './reserva/view/view.component';
import { getPageUsuario } from './usuario/page/page.component';
import { CreateUsuario } from './usuario/create/create.component';

const routes: Routes = [
  { path: "home", component: AppComponent, pathMatch: "full"},
  { path: "RegisterUsuario", component: RegisterUsuario, pathMatch: "full" },
  { path: "Login", component: LoginComponent, pathMatch: "full" },
  { path: "CreateUsuario", component: CreateUsuario, pathMatch: "full" },
  { path: "ViewUsuario", component: ViewUsuario, pathMatch: "full" },
  {path: "getPageUsuario", component: getPageUsuario, pathMatch:"full"},
  { path: "EditUsuario", component: EditUsuario, pathMatch: "full" },
  { path: "CreateHabitacion", component: CreateHabitacion, pathMatch: "full" },
  { path: "CreatePension", component: CreatePension, pathMatch: "full" },
  { path: "getPageHabitacion", component: getPageHabitacion, pathMatch: "full" },
  { path: "ViewHabitacion", component: ViewHabitacion, pathMatch: "full" },
  { path: "EditHabitacion", component: EditHabitacion, pathMatch: "full" },
  { path: "CreateReserva", component: CreateReserva, pathMatch: "full" },
  { path: "EditReserva", component: EditReserva, pathMatch: "full" },
  { path: "ViewReserva", component: ViewReserva, pathMatch: "full" },
  { path: "getPageReserva", component: getPageReserva, pathMatch: "full" },
  { path: "EditPension", component: EditPension, pathMatch: "full" },
  { path: "getPagePension", component: getPagePension, pathMatch: "full" },
  { path: "ViewPension", component: ViewPension, pathMatch: "full" },
  { path: "EditTipohabitacion", component: EditTipohabitacion, pathMatch: "full" },
  { path: "getPageTipohabitacion", component: getPageTipohabitacion, pathMatch: "full" },
  { path: "ViewTipohabitacion", component: EditTipohabitacion, pathMatch: "full" },
  { path: "UploadFile", component: UploadFile, pathMatch: "full" }
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
