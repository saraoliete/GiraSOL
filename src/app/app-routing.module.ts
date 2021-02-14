import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from "./app.component";
import { LoginComponent } from "./login/login.component";
import { CreateUsuario } from "./usuario/create/create.component";
import { CreateHabitacion } from './habitacion/create/create.component';
import { getPageHabitacion } from "./habitacion/page/page.component";
import { ViewHabitacion } from "./habitacion/view/view.component";
import { EditHabitacion } from "./habitacion/edit/edit.component";
import { CreateReserva } from './reserva/create/create.component';
import { ViewReserva } from './reserva/view/view.component';

const routes: Routes = [
  { path: "/", component: AppComponent, pathMatch: "full" },
  { path: "login", component: LoginComponent, pathMatch: "full" },
  { path: "CreateUsuario", component: CreateUsuario, pathMatch: "full" },
  { path: "CreateHabitacion", component: CreateHabitacion, pathMatch: "full" },
  { path: "getPageHabitacion", component: getPageHabitacion, pathMatch: "full" },
  { path: "ViewHabitacion", component: ViewHabitacion, pathMatch: "full" },
  { path: "EditHabitacion", component: EditHabitacion, pathMatch: "full" },
  { path: "CreateReserva", component: CreateReserva, pathMatch: "full" },
  { path: "ViewReserva", component: ViewReserva, pathMatch: "full" }
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
