import { Component, OnInit, Input } from '@angular/core';
import { Pelicula } from '../../../models/pelicula';
import { PeliculaService } from '../../../services/pelicula.service';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';


@Component({
  selector: 'app-list-peliculas',
  templateUrl: './list-peliculas.component.html'  
})
export class ListPeliculasComponent implements OnInit {
  
  peliculas: Pelicula[];  
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject();

  constructor(private peliculaService:PeliculaService) 
  {
    //opciones del datatable
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 2
    }; 
  }

  ngOnInit() 
  {
      this.peliculaService.getPeliculas().subscribe(peliculaApi => {
        this.peliculas = peliculaApi;      
        this.dtTrigger.next();//para el manejo de datatable
        console.log(this.peliculas);
      });
  }

}
