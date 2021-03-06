import { Component, OnInit } from '@angular/core';
import { Pelicula } from '../../models/pelicula';
import { PeliculaService } from '../../services/pelicula.service';
import { Subject } from 'rxjs';
import { DomSanitizer } from '@angular/platform-browser';//Para las url confiables 
import { NgxSpinnerService } from 'ngx-spinner';//spinner


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
  
})
export class HomeComponent implements OnInit {
  
  peliculas: Pelicula[];  
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject();
  
  constructor(private peliculaService:PeliculaService, private domSanitizar: DomSanitizer, private spinner: NgxSpinnerService)
  { }

  ngOnInit()
  { 
    this.spinner.show();

    //opciones del datatable
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 2,
      language: {                                   
                  emptyTable: "No hay información",
                  info: "Mostrando _START_ a _END_ de _TOTAL_ Entradas",
                  infoEmpty: "Mostrando 0 to 0 of 0 Entradas",
                  infoFiltered: "(Filtrado de _MAX_ total entradas)",
                  infoPostFix: "",
                  thousands: ",",
                  lengthMenu: "Mostrar _MENU_ Entradas",
                  loadingRecords: "Cargando...",
                  processing: "Procesando...",
                  search: "Buscar:",
                  zeroRecords: "Sin resultados encontrados",
                  paginate: {
                        "first": "Primero",
                        "last": "Ultimo",
                        "next": "Siguiente",
                        "previous": "Anterior"
                    }
                 }          
    }; 
    
    this.peliculaService.getPeliculas().subscribe(peliculaApi => {
      this.peliculas = peliculaApi;      
      this.dtTrigger.next();//para el manejo de datatable  
      this.spinner.hide();    
    });  
  }   
}


