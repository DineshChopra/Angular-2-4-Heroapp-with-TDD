import { Component, OnInit } from '@angular/core';
import { Hero } from './hero';
import { HeroService } from './hero.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.css']
})
export class HeroesComponent implements OnInit {

  heroes: Hero[];
  selectedHero: Hero;
  constructor(private heroService: HeroService,
              private router: Router) { }
  ngOnInit() {
    this.heroService.getHeroes().subscribe(
      response => { 
        this.heroes = response['data'] ;
        this.heroService.heroes = this.heroes;
      }
    );
  }
  onSelected(hero: Hero) {
    this.selectedHero = hero;
  }
  gotoDetail() : void{
    this.router.navigate(['/detail', this.selectedHero.id]);
  }
}
