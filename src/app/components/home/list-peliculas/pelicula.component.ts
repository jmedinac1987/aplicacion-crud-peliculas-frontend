import { Component, OnInit, Input } from '@angular/core';
import { Pelicula } from '../../../models/pelicula';
import { PeliculaService } from '../../../services/pelicula.service';
import { DomSanitizer } from '@angular/platform-browser';//Para las url confiables 
import { Router } from '@angular/router';

@Component({
  selector: 'app-pelicula',
  templateUrl: './pelicula.component.html',
  styleUrls: ['./pelicula.component.css']
})
export class PeliculaComponent implements OnInit {
  
  @Input() pelicula: Pelicula; 
  constructor(private domSanitizar: DomSanitizer, private router:Router) { 
  
  }

  ngOnInit() {
    console.log(this.pelicula);
  }

}
