import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';//para obtener datos de la api
import { PeliculaService } from './services/pelicula.service';//para mi servio con la api
import { AppRoutingModule } from './app-routing.module';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule  } from '@angular/platform-browser/animations';//Animaciones necesarias para toastr
import { ToastrModule } from 'ngx-toastr';//mensajes toastr

import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';//para la integración con bootstrap
import { NavbarComponent } from './components/navbar/navbar.component';
import { HomeComponent } from './components/home/home.component';
import { AddComponent } from './components/add/add.component';
import { EditComponent } from './components/edit/edit.component';
import { DataTablesModule } from 'angular-datatables';
import { DeleteComponent } from './components/delete/delete.component';
import { NgxSpinnerModule } from 'ngx-spinner';//Spinner




@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HomeComponent,
    AddComponent,
    EditComponent,
    DeleteComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    DataTablesModule,
    NgxSpinnerModule,
    BrowserAnimationsModule, // required animations module
    ToastrModule.forRoot(), // ToastrModule added
    NgbModule.forRoot()    
  ],
  providers: [PeliculaService],
  bootstrap: [AppComponent]
})
export class AppModule { }
