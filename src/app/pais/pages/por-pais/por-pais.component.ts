import { Component } from '@angular/core';
import { PaisService } from '../../services/pais.service';
import { Country } from '../../interfaces/pais.interface';

@Component({
  selector: 'app-por-pais',
  templateUrl: './por-pais.component.html',
  styles: [
    `
      li{
        cursor: pointer;
      }
    `
  ]
})
export class PorPaisComponent {

  termino:string = "";
  hayError:boolean = false;

  paises:Country[] = [];
  paisesSugeridos:Country[] = [];
  mostrarSugerencias:boolean = false;

  constructor( private PaisService:PaisService ){}

  buscar( termino:string){
    this.hayError = false;
    this.termino = termino;
    this.mostrarSugerencias = false;
    this.PaisService.buscarPais(this.termino)
      .subscribe( 
        (resp) =>{
        console.log(resp);
        this.paises = resp;
      },(err) => {
        this.hayError = true;
        this.paises = [];
      });
  }
  sugerencias(termino:string){
    this.hayError = false;
    this.termino = termino;
    if(termino.length){
      this.mostrarSugerencias = true;
      this.PaisService.buscarPais(termino)
      .subscribe( 
        (resp) =>{
          this.paisesSugeridos = resp.splice(0,5);
      });
    }else{
      this.paisesSugeridos= [];
      this.mostrarSugerencias = false;
    }
  }
}
