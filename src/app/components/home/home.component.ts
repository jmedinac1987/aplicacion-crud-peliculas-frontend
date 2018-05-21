import { Component, OnInit } from '@angular/core';
import { Pelicula } from '../../models/pelicula';
import { PeliculaService } from '../../services/pelicula.service';
import { Subject } from 'rxjs';
import { DomSanitizer } from '@angular/platform-browser';//Para las url confiables 


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
  
})
export class HomeComponent implements OnInit {
  
  peliculas: Pelicula[];  
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject();
  
  constructor(private peliculaService:PeliculaService, private domSanitizar: DomSanitizer)
  { }

  ngOnInit()
  {           
    //opciones del datatable
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 2          
    }; 
    
    this.peliculaService.getPeliculas().subscribe(peliculaApi => {
      this.peliculas = peliculaApi;      
      this.dtTrigger.next();//para el manejo de datatable      
    });  
  }   
}


