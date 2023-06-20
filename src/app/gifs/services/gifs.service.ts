import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Gif, SearchGifsResponse } from '../interfaces/gifs.interface';

@Injectable({
  providedIn: 'root'
})
export class GifsService {


   BASE_URL:string = 'https://api.giphy.com/v1/gifs';

  private _apiKey:string= 'GsDvojKVVIF7QbJzTqqiIHFvbHzez2cX';
  private _historial:string[] = [];

  //TODO: cambiar tipado
public resultados:Gif[]=[];
  get historial(){
    return [...this._historial];
  }


  constructor(private http:HttpClient){

    this._historial = JSON.parse(localStorage.getItem('historial')!) || [];
    this.resultados = JSON.parse(localStorage.getItem('resultados')!) || [];

  }

  //no duplicados, cortar a 10

  buscarGifs(query:string){
 query = query.trim().toLocaleLowerCase();

    if(!this._historial.includes(query)){
      this._historial.unshift(query);
      this._historial = this._historial.splice(0,10);

      localStorage.setItem('historial', JSON.stringify(this._historial));
    }


    const params = new HttpParams()
                   .set('api_key', this._apiKey)
                   .set('limit','10')
                   .set('q', query);


this.http.get<SearchGifsResponse>(`${this.BASE_URL}/search`,{params}).subscribe(
 (res:any) =>{
  this.resultados = res.data;
  localStorage.setItem('resultados', JSON.stringify(this.resultados));
 },
 (error)=>{
  console.error(error)
 }
);

  }

}
