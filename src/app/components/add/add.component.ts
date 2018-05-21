import { Component, OnInit } from '@angular/core';
import { Pelicula } from '../../models/pelicula';
import { Router } from '@angular/router';
import { PeliculaService } from '../../services/pelicula.service';


@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css']
})
export class AddComponent implements OnInit {
  
   urlUploadB64: string = "../assets/img/upload.png";//url base 64 para previsualización de la imagen seleccionada
   fileImage: File = null;   
   tamanoPermitido: number = 500000;//500kb
   alertaTamanoPortada: boolean = false;
     
  constructor(private router:Router, private peliculaService: PeliculaService)
  {  }

  ngOnInit(){
    
  }

  handleFileInput(file: FileList) {
    if(file != undefined){
      //obtengo el archivo
      this.fileImage = file.item(0);    
      
      if(this.fileImage.size <= this.tamanoPermitido)
      {
          /*Mostrar previsulización de la imagen seleccionada y hacer la apertura de 
          la imagen y realiza la decodificación a base64 para posterior envio a la BD en el método addPelicula*/
          var reader = new FileReader();
          
          reader.onload = (event:any) => 
          {
            this.urlUploadB64 = event.target.result;      
          }
          reader.readAsDataURL(this.fileImage);
          this.alertaTamanoPortada = false;         
      }
      else
      {
        alert("El archivo seleccionado no puede pesar más de " + this.tamanoPermitido/1000 + "kb");   
        this.alertaTamanoPortada = true;         
      }
    }
  }

  addPelicula(formulario)
  { 
    
    //Se valida si el usuario escogio una portada con el peso indicado y si es diferente a la que esta por defecto
    if((this.alertaTamanoPortada) || (this.urlUploadB64 === "../assets/img/upload.png"))
    {
      
      let peliculaFormulario = new Pelicula(1,formulario.titulo,formulario.genero,formulario.director, formulario.fechaEstreno, formulario.precio, formulario.sipnosis, null, null, null);
      //console.log(peliculaFormulario);
      this.peliculaService.addPelicula(peliculaFormulario).subscribe(
        pelicula =>{ console.log(pelicula);
                     this.router.navigate(['/home']);
        },error => console.log(<any>error));
      
    }
    else{
      let peliculaFormulario = new Pelicula(1,formulario.titulo,formulario.genero,formulario.director, formulario.fechaEstreno, formulario.precio, formulario.sipnosis, this.fileImage.type, this.fileImage.name, this.urlUploadB64);
      //console.log(peliculaFormulario);
      this.peliculaService.addPelicula(peliculaFormulario).subscribe(
        pelicula =>{ console.log(pelicula)
                     this.router.navigate(['/home']);
        },error => console.log(<any>error));
      
    }       
    
  }  

}
