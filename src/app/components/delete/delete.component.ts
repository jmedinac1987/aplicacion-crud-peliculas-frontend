import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PeliculaService } from '../../services/pelicula.service';
import { Pelicula } from '../../models/pelicula';
import { DomSanitizer } from '@angular/platform-browser';//Para las url confiables 
import { ToastrService } from 'ngx-toastr';//mensajes Toastr

@Component({
  selector: 'app-delete',
  templateUrl: './delete.component.html',
  styleUrls: ['./delete.component.css']
})
export class DeleteComponent implements OnInit {
  
  id: any;
  params: any;
  urlUploadB64: string = "../assets/img/upload.png";  
  pelicula = new Pelicula(1, 'titulo', 'genero', 'director', 'fechaEstreno', 2, 'sipnosis', 'formato_portada', 'nombre_portada', 'portada');
  
  constructor(private activatedRoute: ActivatedRoute, private peliculaService: PeliculaService, private domSanitizar: DomSanitizer, private router:Router, private toastr: ToastrService) 
  { }

  ngOnInit() 
  {
    window.scrollTo(0,0); 

    //Obtengo el id desde la url
    this.params = this.activatedRoute.params.subscribe(params => this.id = params['id']);

    this.peliculaService.getPelicula(this.id).subscribe(
      data => {
       //console.log(data);
       this.pelicula.id = data['id'];
       this.pelicula.titulo = data['titulo'];
       this.pelicula.genero = data['genero'];
       this.pelicula.director = data['director'];
       this.pelicula.fechaEstreno = data['fechaEstreno'];
       this.pelicula.precio = data['precio'];
       this.pelicula.sipnosis = data['sipnosis'];
       this.pelicula.formato_portada = data['formato_portada'];
       this.pelicula.nombre_portada = data['nombre_portada'];
       this.pelicula.portada = data['portada'];
       
       if(this.pelicula.portada != "")
         this.urlUploadB64 = this.pelicula.portada;
      },
      error =>  console.log(<any>error));
  }

  showSuccess() {
    this.toastr.success('Película Eliminada!');
  }

  showError() {
    this.toastr.error('Comuniquese con el administrador de la base de datos', 'Error!');
  }

  deletePelicula()
  { 
    if(confirm("Realmente desea eliminar la película?")){
      this.peliculaService.deletePelicula(this.pelicula.id).subscribe(
        pelicula => {console.log(pelicula);
          this.showSuccess();
          this.router.navigate(['/home']);  
        }, error =>{ console.log(<any>error)
            this.showError();    
        });                  
    }
  }  

  //para evitar problemas de memoria cuando se pierda el observable
  ngOnDestroy()
  {
    this.params.unsubscribe();
  }

}
