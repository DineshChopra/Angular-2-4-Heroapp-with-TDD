import { Component, OnInit } from '@angular/core';
import { Hero } from './hero';
import { HEROES } from './heroes';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'app works!';
  heroes : Hero[];
  selectedHero : Hero;

  ngOnInit(){
    this.heroes = HEROES;
  }
  onSelect(hero : Hero){
    this.selectedHero = hero;
  }
  
}
