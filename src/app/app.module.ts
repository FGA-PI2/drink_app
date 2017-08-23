import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { MyApp } from './app.component';
import { LoginPage } from '../pages/login/login';
import { RegisterPage } from '../pages/register/register';
import { MenuPage } from '../pages/menu/menu';
import { CardapioPage } from '../pages/cardapio/cardapio';
import { UserService } from '../domain/user/user-service';
import { CardapioService } from '../domain/cardapio/cardapio-service';

@NgModule({
  declarations: [
    MyApp,
    LoginPage,
    RegisterPage,
    MenuPage,
    CardapioPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    LoginPage,
    RegisterPage,
    MenuPage,
    CardapioPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    UserService,
    CardapioService,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
