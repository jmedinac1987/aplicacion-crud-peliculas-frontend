import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PeliculaService } from '../../services/pelicula.service';
import { Pelicula } from '../../models/pelicula';
import { DomSanitizer } from '@angular/platform-browser';//Para las url confiables
import { ToastrService } from 'ngx-toastr';//mensajes Toastr 

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit, OnDestroy {
 
  id: any;
  params: any;
  urlUploadB64: string = "../assets/img/upload.png";
  fileImage: File = null;  
  pelicula = new Pelicula(1, 'titulo', 'genero', 'director', 'fechaEstreno', 2, 'sipnosis', 'formato_portada', 'nombre_portada', 'portada');
  tamanoPermitido: number = 500000;//500kb
  alertaTamanoPortada: boolean = true;

  constructor(private activatedRoute: ActivatedRoute, private peliculaService: PeliculaService, private domSanitizar: DomSanitizer, private router:Router, private toastr: ToastrService) 
  {     

  }

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
      
      this.validateInputPrecio();//Evita ingresar números negativos en el campo precio 

  }

  validateInputPrecio(){
    
    const campoPrecio = document.getElementById('precio');
    
    campoPrecio.addEventListener('keydown', function(evento) {            
      
      let teclaPresionada = evento.key;      
      let teclaPresionadaEsUnNumero = Number.isInteger(parseInt(teclaPresionada));
      let sePresionoUnaTeclaAdmitida = teclaPresionada != ',' &&
                                       teclaPresionada != 'Tab' &&         
                                       teclaPresionada != 'ArrowUp' &&
                                       teclaPresionada != 'ArrowLeft' &&
                                       teclaPresionada != 'ArrowRight' &&
                                       teclaPresionada != 'Backspace' &&
                                       teclaPresionada != 'Delete' &&            
                                       !teclaPresionadaEsUnNumero;      

      if (sePresionoUnaTeclaAdmitida) {
        evento.preventDefault();
      }
    });
  }

  handleFileInput(file: FileList) {
    if(file != undefined){
      //obtengo el archivo
      this.fileImage = file.item(0);    

      if(this.fileImage.size <= this.tamanoPermitido)
      {
              
          /*Mostrar previsulización de la imagen seleccionada y hacer la apertura de 
          la imagen y realiza la decodificación a base64 para posterior envio a la BD en el método editPelicula*/
          var reader = new FileReader();
          
          reader.onload = (event:any) => 
          {
            this.urlUploadB64 = event.target.result;      
          }
          reader.readAsDataURL(this.fileImage);
          
      }
      else
      {
        alert("El archivo seleccionado no puede pesar más de " + this.tamanoPermitido/1000 + "kb");            
        this.alertaTamanoPortada = false;
      }
    }
  }

  showSuccess() {
    this.toastr.success('Película Editada!');
  }

  showError() {
    this.toastr.error('Comuniquese con el administrador de la base de datos', 'Error!');
  }

  editPelicula()
  { 
    //Se verifican los campos de la imagen 
    if(this.pelicula.portada != this.urlUploadB64)
        this.pelicula.portada = this.urlUploadB64;
    
    if(this.pelicula.portada == "../assets/img/upload.png")
        this.pelicula.portada = null;
    
    if(this.fileImage != null){ 
      //Se valida si el usuario escogio una portada con el peso indicado y si es diferente a la almacenada en la base de datos
      if(this.alertaTamanoPortada && (this.fileImage.name != this.pelicula.nombre_portada))
        this.pelicula.nombre_portada = this.fileImage.name;
      
      if(this.alertaTamanoPortada && (this.fileImage.type != this.pelicula.formato_portada))
        this.pelicula.formato_portada = this.fileImage.type;
    }
    
    this.peliculaService.updatePelicula(this.pelicula).subscribe(
      pelicula  => {console.log(pelicula);
                    this.showSuccess();
                    this.router.navigate(['/home']);  
    },error => { console.log(<any>error);
                 this.showError();
    });
    
    
  }

  //para evitar problemas de memoria cuando se pierda el observable
  ngOnDestroy()
  {
    this.params.unsubscribe();
  }

}
