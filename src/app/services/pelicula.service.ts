import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Pelicula } from '../models/pelicula';
import { Observable } from 'rxjs/internal/Observable';//nueva forma de obtener los tipo Observales en angular

@Injectable({
  providedIn: 'root'
})
export class PeliculaService {
  
  server: string;  

  constructor(private _http:HttpClient)
  { 
    this.server = 'http://laravel.app/api/v1';//API Laravel
  }
  
  getPeliculas(): Observable<Pelicula[]> 
  {    
    return this._http.get<Pelicula[]>(this.server+'/pelicula');//teniendo en cuenta que se usa HttpClient este obtiene los datos ya en formato json y observable    
  }

  getPelicula(id: number): Observable<Pelicula>
  {
    return this._http.get<Pelicula>(this.server+'/pelicula/'+id);
  }

  addPelicula(pelicula: Pelicula):  Observable<Pelicula>
  {
    return this._http.post<Pelicula>(this.server+'/pelicula', pelicula);
  }

  updatePelicula(pelicula: Pelicula):  Observable<Pelicula>
  {   
    return this._http.put<Pelicula>(this.server+'/pelicula/'+pelicula.id, pelicula);
  }

  deletePelicula(id: number):  Observable<Pelicula>
  {   
    return this._http.delete<Pelicula>(this.server+'/pelicula/'+id);
  }
}
