import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

//Manejo de rutas en angular
import { Routes, RouterModule } from '@angular/router';

//Importamos los componentes que estan en app.module.ts
import { NavbarComponent } from './components/navbar/navbar.component';
import { HomeComponent } from './components/home/home.component';
import { AddComponent } from './components/add/add.component';
import { EditComponent } from './components/edit/edit.component';
import { DeleteComponent } from './components/delete/delete.component';

//Array que contendra todas nuestras rutas
const routes:Routes =[
  {path:'', redirectTo: '/home', pathMatch:'full'},
  {path:'home', component:HomeComponent},
  {path:'add', component:AddComponent},
  {path:'edit/:id', component:EditComponent},//recibe el id como parametro
  {path:'delete/:id', component:DeleteComponent}
]

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)//recibe la constante routes 
  ],
  exports:[RouterModule],
  declarations: []
})
export class AppRoutingModule { }
