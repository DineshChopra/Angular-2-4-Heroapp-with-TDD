import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { HeroDetailComponent } from './hero-detail.component';
import { HeroComponent } from './hero.component';
import { HeroService } from './hero.service';
import { HeroesComponent } from './heroes.component';
import { AppRoutingModule }     from './app-routing.module';
import { DashboardComponent } from './dashboard.component';
@NgModule({
  declarations: [
    AppComponent,
    HeroDetailComponent,
    HeroComponent,
    HeroesComponent,
    DashboardComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    AppRoutingModule
  ],
  providers: [ HeroService ],
  bootstrap: [AppComponent]
})
export class AppModule { }
