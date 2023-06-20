import { Component, OnInit } from '@angular/core';
import { GifsService } from '../services/gifs.service';
import { Gif } from '../interfaces/gifs.interface';

@Component({
  selector: 'app-resultados',
  templateUrl: './resultados.component.html',
  styleUrls: ['./resultados.component.css']
})
export class ResultadosComponent implements OnInit {


  get resultados(){
    return this.gifService.resultados;
  }


  resultado:Gif[] =[];


  constructor(private gifService:GifsService) { }

  ngOnInit(): void {


  }

}
