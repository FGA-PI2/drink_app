import { Injectable } from '@angular/core';
import { Cardapio } from './cardapio'

@Injectable()
export class CardapioService {

  private _cardapio: Cardapio[];
  constructor(){
    this._cardapio = [
      new Cardapio('Bebida 01','Descrição da bebida 01',9.90, 'https://coisasdediva.files.wordpress.com/2016/02/drinks-com-vodka-5.jpg'),
      new Cardapio('Bebida 02','Descrição da bebida 01',5.90, 'http://loucosporpraia.com.br/wp-content/uploads/2015/03/drinks-faceis.jpg'),
      new Cardapio('Bebida 03','Descrição da bebida 01',7.90, 'http://cdn.revistadonna.clicrbs.com.br/wp-content/uploads/2016/06/quentins-748x499.jpg'),
      new Cardapio('Bebida 04','Descrição da bebida 01',19.90, 'https://www.papodebar.com/wp-content/uploads/2011/12/drink-negroni.jpg'),
      new Cardapio('Bebida 05','Descrição da bebida 01',199.99, 'https://www.papodebar.com/wp-content/uploads/2012/06/kamikaze-branco.jpg'),
      new Cardapio('Bebida 06','Descrição da bebida 01',1.99, 'http://imagens1.ne10.uol.com.br/blogsne10/social1/uploads/2015/10/drink.jpg'),
      new Cardapio('Bebida 07','Descrição da bebida 01',0.99, 'https://coisasdediva.files.wordpress.com/2016/02/drinks-com-vodka-5.jpg'),
      new Cardapio('Bebida 08','Descrição da bebida 01',6.99, 'http://loucosporpraia.com.br/wp-content/uploads/2015/03/drinks-faceis.jpg'),
      new Cardapio('Bebida 09','Descrição da bebida 01',7.99, 'http://cdn.revistadonna.clicrbs.com.br/wp-content/uploads/2016/06/quentins-748x499.jpg'),
      new Cardapio('Bebida 10','Descrição da bebida 01',14.99, 'https://www.papodebar.com/wp-content/uploads/2011/12/drink-negroni.jpg'),
    ]

    }

  // SUBSTITUIR PELA API DEPOIS
  cardapio(){
    return this._cardapio;

  }
}
