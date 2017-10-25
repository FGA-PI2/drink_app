import { Injectable } from '@angular/core';

@Injectable()
export class Cardapio {

 
  public images: String[]; 

  constructor() {
    this.images = [
      'https://coisasdediva.files.wordpress.com/2016/02/drinks-com-vodka-5.jpg',
      'http://static.vix.com/pt/sites/default/files/styles/large/public/bdm/medicina-alternativa/drinks-afrodisiacos.jpg?itok=Wh48FOQj',
      'http://osboemios.com.br/wp-content/uploads/2016/01/Os-Boemios-Drinks-01-1160x480.jpg',
      'https://simplifica.efacil.com.br/wp-content/uploads/2015/12/drinks-faceis-para-festas-de-fim-de-ano.jpg',
      'http://www.elhombre.com.br/wp-content/uploads/2014/08/drinks-drinks-manjeticao-el-hombre.jpg',
      'http://osboemios.com.br/wp-content/uploads/2014/09/drinks-para-churrasco.jpg',
      'http://loucosporpraia.com.br/wp-content/uploads/2015/03/drinks-faceis.jpg',
      'https://coisasdediva.files.wordpress.com/2016/02/drinks-com-vodka-5.jpg',
      'http://static.vix.com/pt/sites/default/files/styles/large/public/bdm/medicina-alternativa/drinks-afrodisiacos.jpg?itok=Wh48FOQj',
      'http://osboemios.com.br/wp-content/uploads/2016/01/Os-Boemios-Drinks-01-1160x480.jpg',
      'https://simplifica.efacil.com.br/wp-content/uploads/2015/12/drinks-faceis-para-festas-de-fim-de-ano.jpg',
      'http://www.elhombre.com.br/wp-content/uploads/2014/08/drinks-drinks-manjeticao-el-hombre.jpg',
      'http://osboemios.com.br/wp-content/uploads/2014/09/drinks-para-churrasco.jpg',
      'http://loucosporpraia.com.br/wp-content/uploads/2015/03/drinks-faceis.jpg'
    ]
  }

  getImages(){
    return this.images;
  }
}
